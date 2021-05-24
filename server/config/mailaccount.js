const nodemailer = require("nodemailer");
const properties = require("./properties");

let transporter = nodemailer.createTransport({
  service: properties.NODEMAILER_SERVICE,
  auth: {
    user: properties.NODEMAILER_USER,
    pass: properties.NODEMAILER_PASSWORD,
  },
  pooled: true
});

module.exports = transporter
