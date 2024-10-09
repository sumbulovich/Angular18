import app from "./app";
import { setupWebSocketServer } from "./routes/websocket";

const port = process.env['PORT'] || 3000;

// Start up the Node server
const server = app;

server.get('/', (req, res) => {
  res.send('Hello World!')
});

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

// Set up the WebSocket server
setupWebSocketServer(3001);

export default server

