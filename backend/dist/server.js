"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
const port = process.env['PORT'] || 3000;
// Start up the Node server
const server = app_1.app;
server.get("/", (req, res) => res.send("Express on Vercel"));
server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});
