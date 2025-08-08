import { useEffect, useState } from "react";
import {io} from "socket.io-client";
const API_URL = import.meta.env.VITE_API_BASE_URL ;

const socket = io("https://digitalads-backend.onrender.com")

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

 useEffect(() => {
  socket.on("admin-reply", (msg) => {
    setMessages((prev) => [...prev, { from: "bot", text: msg }]);
  });

  return () => {
    socket.off("admin-reply");
  };
}, []);

  const sendMessage = () => {
    if (!input) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    socket.emit("user-message", input);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-amber-500 text-white p-3 rounded-full"
        >
          Chat with us
        </button>
      ) : (
        <div className="bg-white border shadow-xl rounded-lg w-80 h-96 flex flex-col">
          <div className="bg-amber-500 text-white p-2 flex justify-between">
            <span>Ask me anything</span>
            <button onClick={() => setOpen(false)}>X</button>
          </div>
          <div className="flex-1 p-2 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}>
                <span className={`inline-block px-3 py-1 rounded ${msg.from === "user" ? "bg-green-100" : "bg-gray-200"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex p-2 border-t">
            <input
              type="text"
              className="flex-1 border p-1 rounded-l"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="bg-amber-400 text-white px-4 rounded-r" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox