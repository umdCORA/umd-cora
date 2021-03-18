//All CRUD routing handles will be here
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const ResourceRouter = require("./ResourceRouter")
const UserRouter = require("./UserRouter")
const EmailRouter = require("./EmailRouter")

router.all("/*", (req, res, next) => {
  if (mongoose.connection.readyState != 1) {
    res.status(500);
    res.send("DB Not Connected");
  } else {
    next();
  }
});

router.use("/data/resources", ResourceRouter)
router.use("/", UserRouter)
router.use("/email", EmailRouter)
module.exports = router;