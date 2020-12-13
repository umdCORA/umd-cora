//All CRUD routing handles will be here
var express = require("express");
var router = express.Router();
const UserDB = require("../dao/UserDAO");
const ResourceDB = require("../dao/ResourceDAO");
const mongoose = require("mongoose");

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
  } else{
    next();
  }
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
  if(req.query.tags){
    params.tags= {$all: JSON.parse(req.query.tags)}
    
  }
  if(req.query.lat && req.query.long && req.query.radius){
    params = {"location.geo":{
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [req.query.long, req.query.lat]
        },
        $maxDistance: req.query.radius/.000621371
       
      }
    }
    }
  }
  var filter = ResourceDB.find(params , (err, doc) => {
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
    tags: req.body.tags
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
    }
  );
});

router.delete("/data/resources", (req, res) => {
  ResourceDB.deleteMany(req.query, (err, doc) => {
    errorFun(err, res);
    res.send(doc);
  });
});

module.exports = router;
