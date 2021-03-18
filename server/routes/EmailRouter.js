var router = require("express").Router();

const transporter = require("../config/mailaccount");
const test_transporter = require("../config/testmailaccount");
const properties = require("../config/properties");
const nodemailer = require("nodemailer");
const UserDB = require("../dao/UserDAO");
const NewsletterDB = require("../dao/NewsletterDAO");
const agenda = require("../config/scheduler").agenda

router.post("/test", async (req, res) => {
  let from = req.body.from || properties.NODEMAILER_USER;
  let to = req.body.to || [properties.NODEMAILER_USER];
  let subject = req.body.subject || "TEST SUBJECT";
  let text = req.body.text || "TEST TEXT";
  let html = req.body.html || "<p>TEST HTML</p>";

  let message = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  let trans = await test_transporter();
  let info = await trans.sendMail(message);
  info.url = nodemailer.getTestMessageUrl(info);
  res.send(info);
});

router.post("/massMail", async (req, res) => {
  let from = properties.NODEMAILER_USER;
  let to = await UserDB.findMailList();
  let subject = req.body.subject || "TEST SUBJECT";
  let text = req.body.text || "TEST TEXT";
  let html = req.body.html || "<p>TEST HTML</p>";

  let message = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(info);
    }
  });
});

/*
Body:
{
    "text": "Plaintext message for email body",
    "from": "Someone@email.com",
    "subject": "Subject header"
}
*/
router.post("/schedulePlaintext", async (req, res) =>{
    let {interval, text, from, subject, html} = req.body;

    let entry = new NewsletterDB({
        content: text,
        content_type: 'plaintext',
        subject: subject
    })
    entry.save({})
    let builder = {
        text: text,
        from: from,
        subject: subject,
        id: id,
        html: null
    }

    await agenda.schedule(interval, "send mass email", builder)

    res.send("scheduled for: " + interval)
})

router.get("/recipients", async (req, res) => {
  let list = await UserDB.findMailList();
  res.send(list);
});

module.exports = router;