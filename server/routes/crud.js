//All CRUD routing handles will be here
var express = require("express");
var router = express.Router();
const Properties = require("../config/properties");
const UserDB = require("../dao/UserDAO");
const ResourceDB = require("../dao/ResourceDAO");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    res.send("DB ERROR-STATUS: " + mongoose.connection.readyStatus);
  } else {
    next();
  }
});

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

router.post("/data/users/login", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;

  UserDB.findOne({ username: username })
    .then(function (user) {
      if(!user) return 0
      return bcrypt.compare(password, user.hash);
    })
    .then(function (correctPsw) {
      if (!correctPsw) {
        res.status(403).send("User and password do not match");
      }
      res.send();
    })
    .catch(function (error) {
      console.log("Err: ");
      console.log(error);
      res.send(error.message);
      next();
    });
});
/*
{
  "username": "username",
  "email": "email",
  "password": "password",
  "newPassword": "newPassword"
}
 */
router.post("/data/users/updatePassword", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var newPassword = req.body.newPassword;

  UserDB.findOne({ username: username }, (err, doc) => {
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
      bcrypt.hash(newPassword, parseInt(doc.salt), (err, encrpyted) => {
        doc.hash = encrpyted;
        doc.save();
        res.send("Password changed");
        next();
      });
    });
  });
});

router.post("/data/users/getAll", (req, res, next) => {
  UserDB.find({}).then((doc) => {
    res.send(doc);
  });
});
router.post("/data/users/getUser", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var email = req.body.email;
  UserDB.findOne({ username: username })
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

router.post("/data/users/upvote", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { username: username },
    {
      $addToSet: { "meta.upvoted": postID },
      $pull: { "meta.downvoted": postID },
    }
  ).then((err,doc) => {
    res.send();
  });
});

router.post("/data/users/downvote", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { username: username },
    {
      $addToSet: { "meta.downvoted": postID },
      $pull: { "meta.upvoted": postID },
    }
  ).then(() => {
    res.send();
  });
});

router.post("/data/users/bookmark", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { username: username },
    {
      $addToSet: { "meta.bookmarked": postID },
    }
  ).then(() => {
    res.send();
  });
});

router.post("/data/users/unbookmark", (req, res, next) => {
  var username = req.body.username.toLowerCase();
  var password = req.body.password;
  var postID = req.body.postID;
  UserDB.findOneAndUpdate(
    { username: username },
    {
      $pull: { "meta.bookmarked": postID },
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
    res.send(doc);
  });
});

router.put("/data/resources/:id", (req, res) => {
  var id = req.params.id;
  ResourceDB.findByIdAndUpdate(id, req.body, (err, doc) => {
    errorFun(err, res);
    res.send(doc);
  });
});

router.get("/data/resources", (req, res) => {
  var params = {};
  if (req.query.lat && req.query.long && req.query.radius) {
    params = {
      "location.geo": {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [req.query.lat, req.query.long],
          },
          $maxDistance: req.query.radius / 0.000621371, // mile to meters for google api
        },
      },
    };
  }
  if (req.query.tags) {
    params.tags = { $all: req.query.tags.split(",") };
  }
  var filter = ResourceDB.find(params, (err, doc) => {
    errorFun(err, res);
    res.send(doc);
  });
});

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
    res.send(doc);
  });
});

router.delete("/data/resources/:id", (req, res) => {
  if (req.params.id)
    ResourceDB.findByIdAndDelete(id, (err, doc) => {
      errorFun(err, res);
      res.send(doc);
    });
});

router.delete("/data/resources", (req, res) => {
  ResourceDB.deleteMany(req.query, (err, doc) => {
    errorFun(err, res);
    res.send(doc);
  });
});

module.exports = router;
