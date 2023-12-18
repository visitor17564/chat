import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { addUser, generateMessage, getUser, disConnectUser } from "./user.js";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./views"));

io.on("connection", (socket) => {
  console.log(`New WebSocket ${socket.id} connected`);
  socket.on("join", (options, callback) => {
    console.log("options, callback", options, callback);
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        generateMessage(`${user.username}가 방에 참여했습니다.`)
      );
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    const userId = socket.id;
    console.log(userId);
    io.emit("chat message", msg, userId);
  });

  socket.on("disconnect", () => {
    console.log(`WebSocket ${socket.id} disconnected`);
    const user = disConnectUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage("Admin", `${user.username}가 방을 나갔습니다.`)
      );
    }
  });
});

server.listen(port, () => {
  console.log("server running at http://localhost:3000");
});
