import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null); // ref for auto-scroll

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChat = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      // console.log(chat.data.chat.messages);

      const chatMessages = chat?.data?.chat?.messages.map((msg) => {
        return {
          senderId: msg.senderId._id,
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          text: msg.text,
          createdAt: msg.createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    if (!user) return;

    const socket = createSocketConnection();
    // As soon as the page load, socket connection is made & joinChat event is emmited.
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on(
      "messageRecieved",
      ({ senderId, firstName, lastName, text, createdAt }) => {
        // console.log(firstName + ": " + text);
        setMessages((messages) => [
          ...messages,
          { senderId, firstName, lastName, text, createdAt },
        ]);
      }
    );

    // when the component unmount, we must have to close the socket!!
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  // Auto-scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
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
            <div
              key={index}
              className={`chat ${
                msg.senderId === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header text-sm mb-1">
                {msg.firstName + " " + msg.lastName}
                <time className="text-xs opacity-50 ml-2">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </time>
              </div>
              <div className="chat-bubble max-w-xs break-words">{msg.text}</div>
              {/* <div className="chat-footer opacity-50 text-xs">Seen</div> */}
            </div>
          );
        })}
        {/* dummy div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-700 p-4 flex items-center gap-3 bg-base-300 rounded-b-lg">
        <input
          type="text"
          placeholder="Write a message..."
          className="input rounded-md border border-gray-300 focus:outline-none focus:border-info w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              sendMessage();
            }
          }}
        />
        <button
          onClick={() => {
            if (newMessage.trim()) sendMessage();
          }}
          className="btn btn-soft btn-info"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
