const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.isAlive = true;

    ws.on("pong", () => {
        ws.isAlive = true;
    });

    ws.on("message", (message) => {
        console.log("Received:", message.toString());
        ws.send("pong");
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
            return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
    });
}, 600000);

wss.on("close", () => {
    clearInterval(interval);
});

server.listen(PORT, () => {
    console.log(`🚀 searchAI running at http://localhost:${PORT}`);
});
