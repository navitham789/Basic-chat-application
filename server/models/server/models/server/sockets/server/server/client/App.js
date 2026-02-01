import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {

  const sendMessage = () => {
    socket.emit("sendMessage", {
      sender: "User1",
      room: "global",
      text: "Hello World!"
    });
  };

  return (
    <div>
      <h1>Basic Chat App</h1>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
