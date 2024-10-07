"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env['PORT'] || 3000;
// Start up the Node server
const server = app_1.default;
server.get('/', function (req, res) {
    res.send('Hello World!');
});
server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});
exports.default = server;
