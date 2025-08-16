import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!user) return;

    const socket = createSocketConnection();
    // As soon as the page load, socket connection is made & joinChat event is emmited.
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageRecieved", ({ firstName, text }) => {
      // console.log(firstName + ": " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    // when the component unmount, we must have to close the socket!!
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full md:w-3/4 mx-auto m-6 flex flex-col rounded-lg shadow-lg border border-gray-700 bg-base-200 h-[75vh]">
      <h1 className="border-b border-gray-600 p-5 ">Chat</h1>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, index) => {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-header text-sm mb-1">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-2">2 hours ago</time>
              </div>
              <div className="chat-bubble max-w-xs break-words">{msg.text}</div>
              <div className="chat-footer opacity-50 text-xs">Seen</div>
            </div>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-700 p-4 flex items-center gap-3 bg-base-300 rounded-b-lg">
        <input
          type="text"
          placeholder="Write a message..."
          className="input rounded-md border border-gray-300 focus:outline-none focus:border-info w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="btn btn-soft btn-info">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
