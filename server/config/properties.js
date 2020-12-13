require('dotenv').config();

module.exports = {
    DB_PORT: 27017,
    DB: `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@resources.g0hxb.mongodb.net/<dbname>?retryWrites=true&w=majority`,

    SERVER_PORT: 5000,
    SERVER: 'localhost',

    REACT_PORT: 4000,
    REACT: 'localhost',

    database_ENDPOINT: '/api/v1',
    client_ENDPOINT: '/client'
}
