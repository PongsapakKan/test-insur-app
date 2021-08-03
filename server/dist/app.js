"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const database_1 = __importDefault(require("./webConfig/database"));
const registerRoute = require('./routes/register');
database_1.default();
const app = express_1.default();
var port = process.env.PORT || '3000';
app.set('port', port);
var server = http_1.default.createServer(app);
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
//# sourceMappingURL=app.js.map