import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/context";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export default function Messenger() {
  let { chatId } = useParams();
  let { user, navigate } = useContext(AppContext);
  let [messages, setMessages] = useState([]);
  let [chat, setChat] = useState(undefined);

  let type = user ? "volunteer" : "participant";

  useEffect(() => {
    document.getElementById("bottom").scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatId) {
      loadMessages();
      loadChat();
    }

  }, [chatId]);

  async function loadMessages() {
    let q = query(
      collection(db, "messages"),
      where("chat_id", "==", chatId),
      orderBy("created_at")
    );
    onSnapshot(q, (querySnapshot) => {
      let m = [];
      querySnapshot.forEach((doc) => m.push({ ...doc.data(), id: doc.id }));
      setMessages([...m]);
    });
  }

  async function loadChat() {
    onSnapshot(doc(db, "chats", chatId), (doc) => setChat(doc.data()));
  }

  async function sendMessage(ev) {
    ev.preventDefault();

    let content = ev.target.message.value;

    if (content.length === 0) return;

    let message = {
      created_at: new Date(),
      from: type,
      content,
      status: "sent",
      chat_id: chatId,
    };
    ev.target.message.value = "";

    await addDoc(collection(db, "messages"), message);
  }

  async function closeMessenger() {

    if (chat?.status !== "closed")
      updateDoc(doc(db, "chats", chatId), {
        status: "closed",
        closed_at: new Date()
      });

    if (user) navigate('/volunteer');
    else navigate('/');
  }

  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <div className="bg-neutral p-2">
          <button onClick={closeMessenger} className="btn btn-error">Close Chat</button>
        </div>
        <div className="p-2 flex-grow overflow-scroll">
          {type === "volunteer"
            ? messages.map((message) => (
              <div
                key={message.id + message.from}
                className={`chat ${message.from === "volunteer" ? "chat-end" : "chat-start"
                  }`}
              >
                <div
                  style={{ maxWidth: "75%" }}
                  className={`chat-bubble break-all ${message.from === "volunteer"
                    ? "chat-bubble-primary"
                    : "chat-bubble-neutral"
                    }`}
                >
                  {message.content}
                </div>
              </div>
            ))
            : messages.map((message) => (
              <div
                key={message.id + message.from}
                className={`chat ${message.from === "participant" ? "chat-end" : "chat-start"
                  }`}
              >
                <div
                  style={{ maxWidth: "75%" }}
                  className={`chat-bubble break-all ${message.from === "participant"
                    ? "chat-bubble-primary"
                    : "chat-bubble-neutral"
                    }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          {chat?.status === "closed" && <div className="divider">Messenger Has Been Closed</div>}
          <div id="bottom" />
        </div>
        <form className="flex items-center" onSubmit={sendMessage}>
          <input
            disabled={chat?.status === "closed"}
            autoComplete="off"
            name="message"
            placeholder="Message"
            className="w-full input input-primary rounded-none"
          />
          <button
            disabled={chat?.status === "closed"}
            className="btn btn-primary rounded-none">Send</button>
        </form>
      </div>
    </div>
  );
}
