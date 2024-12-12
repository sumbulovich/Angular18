"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const websocket_1 = require("./websocket");
const port = process.env['PORT'] || 3000;
// Start up the Node server
const server = app_1.default;
server.get('/', (req, res) => {
    res.send('Hello World!');
});
server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});
// Set up the WebSocket server
(0, websocket_1.setupWebSocketServer)(3001);
exports.default = server;
