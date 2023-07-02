const http = require("http");
const server = http.createServer();
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
  });
});

const port = 8000;
server.listen(port, () => console.log(`listening on ${port}`));
