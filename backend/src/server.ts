import app from "./app";

const port = process.env['PORT'] || 3000;

// Start up the Node server
const server = app;

server.get('/', function (req, res) {
  res.send('Hello World!')
});

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

export default server

