//All CRUD routing handles will be here
var express = require("express");
var router = express.Router();
const Properties = require("../config/properties");
const UserDB = require("../dao/UserDAO");
const ResourceDB = require("../dao/ResourceDAO");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const properties = require("../config/properties");

let errorFun = function (err, res) {
  if (err) {
    console.log(`Error: ` + err.message);
    res.status(500);
    res.send(err.message);
  }
};

router.all("/*", (req, res, next) => {
  if (mongoose.connection.readyState != 1) {
    res.status(500);
    res.send("DB Not Connected");
  } else {
    next();
  }
});

/*
 * To register a user to the Users collection:
 * POST: localhost:5000/api/v1/data/users/register
 * body:
 * {
 *  "username": "someUsername",
 *  "email": "user1@email.com",
 *  "password": "somePassword"
 * }
 *
 * Successfull addition will result in a 200 and success message.
 * Some notes:
 * -Usernames and email is treated as case-insensitive, so everything will be stored in lowercase
 * for convenience.
 * -Emails are regex check for RFC standards, will tell you that you failed validation if email is
 * not correctly formatted.
 * -Both usernames and emails are unique, will give a 403 and error message "User validation failed"
 * if username and email are not unique to collection
 * -All passwords are hashed and salted, with a default salt of 12. Increasing
 * salt round by 1 in properties file will double computation time, so keep it at 12.
 * -User account passwords can all be salted with different rounds, and the server will
 * keep track of salt rounds. This means changing salt rounds mid deployment will retain
 * functionality.
 */
router.post("/data/users/register", (req, res, next) => {
  var user = req.body.username.toLowerCase();
  var pswd = req.body.password;
  var email = req.body.email.toLowerCase();

  bcrypt
    .hash(pswd, Properties.BCRYPT_SALT_ROUNDS)
    .then(function (hashedPassword) {
      let newUser = new UserDB({
        username: user,
        email: email,
        hash: hashedPassword,
        salt: Properties.BCRYPT_SALT_ROUNDS,
      });
      return newUser.save({});
    })
    .then(function () {
      res.send("Account created");
    })
    .catch(function (error) {
      console.log("Err: ");
      console.log(error.message);
      res.status(403).send(error.message);
      next();
    });
});

/**
 * To check authentication, pass a password to be hashed.
 *
 * POST: localhost:5000/api/v1/data/users/login
 * body:
 * {
 *    "username": "someUsername",
 *    "password": "somePassword"
 * }
 * Successful login/authentication will result in a 200 code.
 *
 * Some notes:
 * -If either user does not exist or password does not match in database,
 * a 403 will be thrown.
 * -This does not directly compare the two passwords, but rather the two passwords
 * hashes.
 *
 */
router.post("/data/users/login", (req, res, next) => {
  var password = req.body.password;
  var email = req.body.email.toLowerCase();

  UserDB.findOne({ email: email })
    .then(function (user) {
      if (!user) return 0;
      return bcrypt.compare(password, user.hash);
    })
    .then(function (correctPsw) {
      if (!correctPsw) {
        res.status(403).send("User and password do not match");
      }else{
        res.send("Successful login");
      }
    })
    .catch(function (error) {
      console.log("Err: ");
      console.log(error);
      res.send(error.message);
      next();
    });
});
/**
 * To update password
 * POST: localhost:5000/data/users/updatePassword
 * body:
 * {
 *  "email": "someEmail",
 * "password": "someOldPassword",
 * "newPassword": "someNewPassword"
 * }
 *
 * Successful update will give 200 code
 *
 * Some notes:
 * -Creating new password will change the previous salt round of the account
 * to the current salt round in Properties.
 * -If user does not exist, results in a 404.
 * -If old password is incorrect, results in a 403.
 */
router.post("/data/users/updatePassword", (req, res, next) => {
  var email = req.body.email.toLowerCase();
  var password = req.body.password;
  var newPassword = req.body.newPassword;

  UserDB.findOne({ email: email }, (err, doc) => {
    if (!doc) {
      res.status(404).send("User does not exist");
      next();
      return;
    }
    bcrypt.compare(password, doc.hash, function (err, correctPsw) {
      if (!correctPsw) {
        res.status(403).send("Wrong password");
        next();
        return;
      }
      bcrypt.hash(
        newPassword,
        Properties.BCRYPT_SALT_ROUNDS,
        (err, encrpyted) => {
          doc.hash = encrpyted;
          doc.salt = Properties.BCRYPT_SALT_ROUNDS;
          doc.save();
          res.send("Password changed");
          next();
        }
      );
    });
  });
});
/**
 * body:
 * {
 * "username": "..."
 * }
 */
router.post("/data/users/generateUUID", (req, res) => {
  var email = req.body.email.toLowerCase();
  UserDB.findOne({ email: email }, (err, doc) => {
    console.log(doc);
    if (!doc) {
      res.status(404).send("User not found");
    } else {
      doc.resetToken = uuid.v4();
      doc.save().then(
        () => {
          res.send(doc.resetToken);
        },
        (reason) => {
          res.send("Failed due to " + reason);
        }
      );
    }
  });
});

router.post("/data/users/resetPassword", (req, res) => {
  var newPassword = req.body.newPassword;
  var resetToken = req.body.resetToken;
  var email = req.body.email.toLowerCase();

  UserDB.findOne({ email: email }, (err, doc) => {
    if (!doc || err) {
      res.status(404).send("User not found");
    } else {
      if (doc.resetToken == resetToken) {
        bcrypt
          .hash(newPassword, parseInt(Properties.BCRYPT_SALT_ROUNDS))
          .then(function (hashedPassword) {
            doc.hash = hashedPassword;
            doc.save();
          })
          .then(function () {
            res.send("Password changed.");
          });
      } else {
        res.status(403).send("resetToken does not match");
      }
    }
  });
});
/**
 * Grabs and returns all users in the collection. You shouldn't
 * really need this other than for debugging.
 */
router.post("/data/users/getAll", (req, res, next) => {
  UserDB.find({}).then((doc) => {
    res.send(doc);
  });
});

/**
 * Grabs and returns entry in Collection with matching username.
 *
 * POST: you know what it is
 * body:
 * {
 * "username": "..."
 * }
 *
 * On success 200 code is returned.
 *
 * Some notes:
 * -404 if requested user does not exist currently.
 * -case-insensitive for usernames
 */
router.post("/data/users/getUser", (req, res, next) => {
  var email = req.body.email.toLowerCase();

  UserDB.findOne({ email: email })
    .then(function (doc) {
      if (!doc) res.status(404).send("User not found");
      else res.send(doc);
    })
    .catch(function (err) {
      console.log("Err: ");
      console.log(error);
      res.send(error.message);
      next();
    });
});

/**
 * Used to upvote meta data.
 * POST: localhost:5000/api/v1/data/users/upvote
 * body:
 * {
 *  "username": "...",
 * "postID": "UUID of resource entry"
 * }
 *
 * On success returns 200.
 *
 * Some notes:
 * -NO VALIDATION for correct resource UUIDs
 * -Will automatically remove entry from downvote array
 * and move to upvote if it was previously downvoted.
 * -Currently not implemented is tracking the resources meta-data
 * -Handles duplicate IDs.
 */
router.post("/data/users/upvote", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { username: username },
    {
      $addToSet: { "meta.upvoted": postID },
      $pullAll: { "meta.downvoted": [postID] },
    }
  )
    .then(() => {
      /* Increase resource entry metadata
    ResourceDB.findByIdAndUpdate({_id: postID}, {$inc: "meta.votes_positive"})*/
    })
    .then(() => {
      res.send();
    });
});
/**
 * Used to downvote meta data.
 * POST: localhost:5000/api/v1/data/users/downvote
 * body:
 * {
 *  "username": "...",
 * "postID": "UUID of resource entry"
 * }
 *
 * On success returns 200.
 *
 * Some notes:
 * -NO VALIDATION for correct resource UUIDs
 * -Will automatically remove entry from upvote array
 * and move to downvote if it was previously upvoted.
 * -Currently not implemented is tracking the resources meta-data.
 * -Handles duplicate IDs.
 */
router.post("/data/users/downvote", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { username: username },
    {
      $addToSet: { "meta.downvoted": postID },
      $pullAll: { "meta.upvoted": [postID] },
    }
  )
    .then(() => {
      /* Increase resource entry metadata
    ResourceDB.findByIdAndUpdate({_id: postID}, {$inc: "meta.votes_negative"})*/
    })
    .then(() => {
      res.send();
    });
});

/**
 * Same as above, but completely removes all votes related to that resource.
 * Handles duplicate IDs
 */
router.post("/data/users/removeVote", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { username: username },
    {
      $pullAll: { "meta.upvoted": [postID] },
      $pullAll: { "meta.downvoted": [postID] },
    }
  ).then(() => {
    res.send();
  });
});

/**
 * Bookmarks resource ID.
 * Handles duplicate IDs
 */
router.post("/data/users/bookmark", (req, res, next) => {
  var email = req.body.email.toLowerCase();
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { email: email },
    {
      $addToSet: { "meta.bookmarked": postID },
    }
  ).then(() => {
    res.send();
  });
});

/**
 * localhost:5000/api/v1/data/users/getbookmarks?bookmarks:["id1", "id2", ....]
 */
router.get("/data/users/getbookmarks", (req, res, next) => {
  var arr = req.query.bookmarks.split(",");
  ResourceDB.find(
    {
      _id: {
        $in: arr,
      },
    },
    (err, doc) => {
      if (err) res.status(500).send(err.message);
      else{
        doc.forEach(val=>{
          val.pruneTags()
        })
        res.send(doc)
      }
    }
  );
});
/**
 * Removes bookmark.
 */
router.post("/data/users/unbookmark", (req, res, next) => {
  var email = req.body.email.toLowerCase();
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { email: email },
    {
      $pullAll: { "meta.bookmarked": [postID] },
    }
  ).then(() => {
    res.send();
  });
});
/*
router.get("/data/users/:id", (req, res) => {
  var id = req.params.id;
  UserDB.findById(id, (err, doc) => {
    errorFun(err, res);
    res.write(doc);
  });
});

router.put("/data/users/:id", (req, res) => {
  var id = req.params.id;
  UserDB.findByIdAndUpdate(id, (err, doc) => {
    errorFun(err, res);
    res.send(doc);
  });
});

router.get("/data/users", (req, res) => {
  UserDB.find(req.query, (err, doc) => {
    errorFun(err, res);
    res.send(doc);
  });
});

router.post("/data/users", (req, res) => {
  var user = new UserDB({
    username: req.body.username,
    email: req.body.email,
  });

  user.save({}, (err, doc) => {
    errorFun(err, res);
    res.send(doc);
  });
});

router.delete("/data/users", (req, res) => {
  UserDB.deleteMany(req.query, (err, doc) => {
    errorFun(err, res);
    res.send(doc);
  });
});
*/
router.get("/data/resources/:id", (req, res) => {
  var id = req.params.id;
  ResourceDB.findById(id, (err, doc) => {
    errorFun(err, res);
    res.send(doc.pruneTags());
  });
});

router.put("/data/resources/:id", (req, res) => {
  var id = req.params.id;
  ResourceDB.findByIdAndUpdate(id, req.body, (err, doc) => {
    errorFun(err, res);
    res.send(doc.pruneTags());
  });
});

router.get("/data/resourcesAll", (req, res) => {
  ResourceDB.find((err, doc) => {
    doc.forEach((val) => {
      val.pruneTags();
    });
    res.send(doc);
  });
});

router.get("/data/resources", (req, res) => {
  ResourceDB.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.long), parseFloat(req.query.lat)],
        },
        minDistance: 0,
        distanceField: "location.distance",
        query: req.query.tags
          ? { tags: { $all: req.query.tags.split(",") } }
          : {},
        maxDistance: req.query.radius * 1609.34,
        distanceMultiplier: 1 / 1609.34,
        uniqueDocs: true,
      },
    },
  ]).then((doc)=>{
    doc.forEach((val)=>{
      let tags = val.tags.filter((elm)=>{
        return properties.DB_TAGS.includes(elm)
      })
      val.tags = tags
    })
    res.send(doc)
  });
});

/* router.get("/data/resources", (req, res) => {
  let constr = {
    long : req.query.long,
    lat : req.query.lat,
    radius : req.query.radius
  }
  ResourceDB.searchRadius(
    constr,
    (err, doc) => {
      doc.forEach((elm)=>{
        elm.pruneTags()
      })
      res.send(doc);
    }
  );
}); */

router.post("/data/resources", (req, res) => {
  var resource = new ResourceDB({
    name: req.body.name,
    location: req.body.location,
    contact: req.body.contact,
    services: req.body.services,
    description: req.body.description,
    tags: req.body.tags,
  });

  resource.save({}, (err, doc) => {
    errorFun(err, res);
    res.send(doc.pruneTags());
  });
});

router.delete("/data/resources/:id", (req, res) => {
  if (req.params.id)
    ResourceDB.findByIdAndDelete(id, (err, doc) => {
      errorFun(err, res);
      res.send(doc.pruneTags());
    });
});

router.delete("/data/resources", (req, res) => {
  ResourceDB.deleteMany(req.query, (err, doc) => {
    errorFun(err, res);
    res.send(doc.pruneTags());
  });
});

module.exports = router;
