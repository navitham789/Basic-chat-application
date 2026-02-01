const Message = require("../models/Message");
const User = require("../models/User");

module.exports = (io) => {

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("joinRoom", async ({ username, room }) => {
      socket.join(room);

      await User.findOneAndUpdate(
        { username },
        { online: true },
        { upsert: true }
      );

      socket.to(room).emit("userStatus", {
        username,
        status: "online"
      });
    });

    socket.on("sendMessage", async (data) => {
      const message = await Message.create(data);
      io.to(data.room).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

};
