const mongoose = require("mongoose")
const NewsletterSchema = require("../models/Newsletter")

module.exports = mongoose.model('Newsletter', NewsletterSchema)