require('dotenv').config();

module.exports = {
    DB_PORT: 27017,
    DB: `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@resources.g0hxb.mongodb.net/<dbname>?retryWrites=true&w=majority`,

    SERVER_PORT: process.env.PORT || 5000,
    SERVER: 'localhost',

    database_ENDPOINT: '/api/v1',
    client_ENDPOINT: '/client',

    BCRYPT_SALT_ROUNDS: 12,

    DB_TAGS: ["Recovery", "Medicated Assisted Treatment", "Inpatient Rehabilitation", 
    "Outpatient Rehabilitation", "Gender-Specific Treatment", "Intervention Specialists",
    "Recovery Residences", "Mental Health Resources", "Counseling/Therapy", "Support Groups",
    "Payment", "Sliding Scale", "Free", "Paid", "Harm Reduction", "Overdose Response", "Needle Exchange Programs", 
    "Vaccine and Prophylaxis Clinics", "Pregnancy Support", "Free Transportation"],

    NODEMAILER_USER: process.env.NODEMAILER_USER || null,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD || null,
    NODEMAILER_SERVICE: process.env.NODEMAILER_SERVICE || null,

    SCHEDULE_REFRESH: "5 minutes"
}
