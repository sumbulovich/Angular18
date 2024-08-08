import { app } from "./src/app"

const port = process.env['PORT'] || 3000;

// Start up the Node server
const server = app;
server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
