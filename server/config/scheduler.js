const Agenda = require("agenda");
const properties = require("./properties");
const transporter = require("./mailaccount");
const UserDB = require("../dao/UserDAO")
const test_transporter = require("./testmailaccount")

const agenda = new Agenda({
  db: { address: properties.DB, collection: "jobCollection", options:{useUnifiedTopology: true} },
  processEvery: "10 minutes",
});

agenda.define("send mass email", async (job) => {
  const { text, from, subject, html } = job.attrs.data;
  const to = await UserDB.findMailList();
  let transport = await test_transporter()
  await transport.sendMail({
    text: text,
    from: from,
    to: to,
    subject: subject,
    html: html,
  }, (err, info)=>{
      if(err){
          console.log(err)
      }else{
          console.log(info)
      }
  });
});

agenda.define("test echo", async (job) =>{
    console.log("ECHO")
});

module.exports = {
  start: async () => {
    await agenda.start();
  },
  agenda: agenda,
};
