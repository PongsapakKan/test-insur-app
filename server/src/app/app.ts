import express from 'express';
import http from 'http';
import connectDB from './webConfig/database';

const router = require('./routes/product');

connectDB();
const app = express();
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

app.use('/api/getProduct', router);

app.listen((port, err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

module.exports = app;

