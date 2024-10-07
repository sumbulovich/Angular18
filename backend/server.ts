import app from "./src/app";
import express from "express";

const port = process.env['PORT'] || 3000;

// Start up the Node server
const server = app;

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

export default server

