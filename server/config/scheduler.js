const Agenda = require("agenda");
const properties = require("./properties");
const transporter = require("./testmailaccount");
const UserDB = require("../dao/UserDAO");
const NewsletterDB = require("../dao/NewsletterDAO")
const nodemailer = require("nodemailer")
const fs = require("fs")
const agenda = new Agenda({
  db: {
    address: properties.DB,
    collection: "jobCollection",
    options: { useUnifiedTopology: true },
  },
  processEvery: properties.SCHEDULE_REFRESH,
});

agenda.define("send mass email", async (job) => {
  const { content, from, subject, html, to, attachments } = job.attrs.data;
  let transport = await transporter()

  await transport.sendMail(
    {
      text: content,
      from: from,
      to: to || await UserDB.findMailList(),
      subject: subject,
      html: fs.createReadStream(html),
      attachments: attachments
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        console.log(nodemailer.getTestMessageUrl(info))
      }
    }
  );
});

module.exports = {
  start: async () => {
    await agenda.start();
  },
  agenda: agenda,
};
