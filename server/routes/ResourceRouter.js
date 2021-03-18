//All CRUD routing handles will be here
var express = require("express");
var router = express.Router();
const ResourceDB = require("../dao/ResourceDAO");
const properties = require("../config/properties");

let errorFun = function (err, res) {
  if (err) {
    console.log(`Error: ` + err.message);
    res.status(500);
    res.send(err.message);
  }
};

router.get("/:id", (req, res) => {
  var id = req.params.id;
  ResourceDB.findById(id, (err, doc) => {
    errorFun(err, res);
    res.send(doc.pruneTags());
  });
});

router.put("/:id", (req, res) => {
  var id = req.params.id;
  ResourceDB.findByIdAndUpdate(id, req.body, (err, doc) => {
    errorFun(err, res);
    res.send(doc.pruneTags());
  });
});

router.get("", (req, res) => {
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
  ]).then((doc) => {
    doc.forEach((val) => {
      let tags = val.tags.filter((elm) => {
        return properties.DB_TAGS.includes(elm);
      });
      val.tags = tags;
    });
    res.send(doc);
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

router.post("", (req, res) => {
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

router.delete("/:id", (req, res) => {
  if (req.params.id)
    ResourceDB.findByIdAndDelete(id, (err, doc) => {
      errorFun(err, res);
      res.send(doc.pruneTags());
    });
});

router.delete("", (req, res) => {
  ResourceDB.deleteMany(req.query, (err, doc) => {
    errorFun(err, res);
    res.send(doc.pruneTags());
  });
});

module.exports = router;
