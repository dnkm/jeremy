import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/context";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export default function Messenger() {
  let { chatId } = useParams();
  let { user } = useContext(AppContext);
  let [messages, setMessages] = useState([]);

  let type = user ? "volunteer" : "participant";

  useEffect(() => {
    document.getElementById("bottom").scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatId) loadMessages();
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

  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <div className="p-2 flex-grow overflow-scroll">
          {type === "volunteer"
            ? messages.map((message) => (
                <div
                  key={message.id + message.from}
                  className={`chat ${
                    message.from === "volunteer" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    style={{ maxWidth: "75%" }}
                    className={`chat-bubble break-all ${
                      message.from === "volunteer"
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
                  className={`chat ${
                    message.from === "participant" ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    style={{ maxWidth: "75%" }}
                    className={`chat-bubble break-all ${
                      message.from === "participant"
                        ? "chat-bubble-primary"
                        : "chat-bubble-neutral"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
          <div id="bottom" />
        </div>
        <form className="flex items-center" onSubmit={sendMessage}>
          <input
            autoComplete="off"
            name="message"
            placeholder="Message"
            className="w-full input input-primary rounded-none"
          />
          <button className="btn btn-primary rounded-none">Send</button>
        </form>
      </div>
    </div>
  );
}
