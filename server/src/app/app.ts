import express from 'express';
import http from 'http';
import connectDB from './webConfig/database';

const registerRoute = require('./routes/register');

connectDB();
const app = express();
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);


app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.use('/api/register', registerRoute);

app.listen((port, err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

module.exports = app;

