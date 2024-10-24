import { WebSocket } from "ws";

export function setupWebSocketServer(port: number) {
  const wss = new WebSocket.Server({ port });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    // Send random numbers at the specified interval
    const generateRandomNumbers = () => {
      if (ws.readyState === WebSocket.OPEN) {
        const randomValue = Math.floor(Math.random() * 100);
        let status = randomValue > 50 ? 'online' : 'offline';
        ws.send(JSON.stringify({ status }));
      }
    };

    // Default interval is 1 second
    let timer = setInterval(generateRandomNumbers, 1000);

    ws.on("message", (message) => {
      // Pause / resume data sending if received a new value from the client
      const { data } = JSON.parse(message.toString());
      clearInterval(timer);
      if (data === 'pause') ws.send(JSON.stringify({ status: 'paused' }));
      else timer = setInterval(generateRandomNumbers, 1000);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      clearInterval(timer);
    });
  });

  console.log(`WebSocket server listening`);
}

