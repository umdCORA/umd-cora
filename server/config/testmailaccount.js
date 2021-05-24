const properties = require("./properties")
const nodemailer = require("nodemailer")

module.exports = async () => {
    let test_acc = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      pooled: true,
      secure: false, // true for 465, false for other ports
      auth: {
        user: test_acc.user, // generated ethereal user
        pass: test_acc.pass, // generated ethereal password
      },
    });
  
    return transporter
  };