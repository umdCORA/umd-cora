const Agenda = require("agenda");
const properties = require("./properties");
const transporter = require("./mailaccount");
const UserDB = require("../dao/UserDAO");
const NewsletterDB = require("../dao/NewsletterDAO")

const agenda = new Agenda({
  db: {
    address: properties.DB,
    collection: "jobCollection",
    options: { useUnifiedTopology: true },
  },
  processEvery: properties.SCHEDULE_REFRESH,
});

agenda.define("send mass email", async (job) => {
  const { content, from, subject, html, to } = job.attrs.data;
  let transport = transporter

  await transport.sendMail(
    {
      text: content,
      from: from,
      to: to || await UserDB.findMailList(),
      subject: subject,
      html: html,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
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
