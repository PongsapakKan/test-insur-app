import express from 'express';
import http from 'http';
import connectDB from './webConfig/database';

const cors = require('cors');
const router = require('./routes/product');

connectDB();
const app = express();
var port = process.env.PORT || '3001';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use('/api/getProduct', router);

app.listen((port, err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

module.exports = app;

