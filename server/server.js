//Main config
const express = require("express");
const path = require('path')
const app = express();
const actuator = require("express-actuator");
const morgan = require('morgan');
const db = require("./config/database");
const properties = require("./config/properties");
const clientRouter = require("./routes/clientrouter.js");
const crudRouter = require("./routes/crud");


app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(actuator());
app.use(properties.database_ENDPOINT, crudRouter);
app.use(properties.client_ENDPOINT, clientRouter);

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

db();

app.listen(properties.SERVER_PORT, function () {
  console.log(`Listening on port: ${properties.SERVER_PORT}`);
});
