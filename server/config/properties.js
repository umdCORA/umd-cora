require('dotenv').config();

module.exports = {
    DB_PORT: 27017,
    DB: `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@resources.g0hxb.mongodb.net/<dbname>?retryWrites=true&w=majority`,

    SERVER_PORT: process.env.PORT || 5000,
    SERVER: 'localhost',

    database_ENDPOINT: '/api/v1',
    client_ENDPOINT: '/client',

    BCRYPT_SALT_ROUNDS: 10
}
