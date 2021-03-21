var router = require("express").Router();

const UserDB = require("../dao/UserDAO");
const NewsletterDB = require("../dao/NewsletterDAO");
const agenda = require("../config/scheduler").agenda;
const upload = require("../config/multerupload");


/**
 * Parameters:
 * ?[key]=[value]&[key]=[value]&...
 * interval: When email should be sent
 *
 *
 * form-data:
 * [key] = [value]
 * html = 'text/html' file
 * attachments = 'image/*******' file(s)
 * content = 'text/plain' file
 * subject = 'text/plain' file
 */
router.post("/hi", (req, res)=>{
  console.log("sent")
  res.send("hi")
})

router.post(
  "/schedule",
  upload.fields([{ name: "html", maxCount: 1 }, { name: "attachments" }, {name: "demo"}]),
  (req, res) => {
    console.log(req.body)
    res.send("hi")
  }
);

/*
Body:
{
    "content": "Plaintext message for email body",
    "from": "Someone@email.com",
    "subject": "Subject header",
    "html": "html message as string"
    "to": "This tag can be ommitted if you want to only send to those who are registered
    as newsletter recipients. Specifying this tag as a "
}
*/

router.post("/schedulePlain", (req, res) => {
  let { interval, content, from, subject, html, to } = req.body;

  let builder = {
    content: content,
    from: from,
    subject: subject,
    html: html,
    to: to,
  };

  let entry = new NewsletterDB({
    content: content,
    content_type: "html",
    subject: subject,
  });

  entry
    .save({})
    .then(
      (doc) => {
        builder.id = doc._id;
        return agenda.schedule(interval, "send mass email", builder);
      },
      (reason) => {
        return Promise.reject(reason);
      }
    )
    .then(
      () => {
        res.send("scheduled for: " + interval);
      },
      (reason) => {
        res.status(500).send(reason.message);
      }
    );
});

router.get("/recipients", async (req, res) => {
  let list = await UserDB.findMailList();
  res.send(list);
});

router.delete("/purgeJobs", (req, res) => {
  agenda.purge();
  agenda.cancel({ nextRunAt: null }).then(
    (doc) => {
      res.send("Removed " + doc + " instance(s)");
    },
    (reason) => {
      res.status(500).send(reason.message);
    }
  );
});

module.exports = router;
