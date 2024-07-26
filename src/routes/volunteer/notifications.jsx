import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

export default function Notifications({ user, navigate }) {
  let [notifications, setNotifications] = useState([{}]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    let q = query(
      collection(db, "chats"),
      where("status", "!=", "closed"),
      orderBy("created_at")
    );
    onSnapshot(q, (querySnapshot) => {
      let chats = [];
      querySnapshot.forEach((doc) => chats.push({ ...doc.data(), id: doc.id }));

      chats = chats.filter((chat) => Object.keys(chat).length > 0);
      setNotifications(chats);
    });
  }

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center">
      <div className="bg-base-300 h-20 flex items-center justify-center text-xl lg:text-2xl tracking-widest font-bold w-full">
        Notifications
      </div>
      <div className="w-full">
        {notifications.map((notification) => (
          <ChatRequest
            key={notification.id}
            chatRequest={notification}
            volunteer_id={user?.uid}
            navigate={navigate}
          />
        ))}
      </div>
    </div>
  );
}

function ChatRequest({ chatRequest, volunteer_id, navigate }) {
  let d = chatRequest?.created_at?.toDate();
  let time = d?.toLocaleTimeString();
  let date = d?.toLocaleDateString();
  let grad_year = chatRequest?.grad_year;
  let topic = chatRequest?.topic === "" ? "Unspecified" : chatRequest?.topic;
  let status = chatRequest?.status;

  async function enterChat() {
    await updateDoc(doc(db, "chats", chatRequest.id), {
      volunteer_id,
      status: "accepted",
    })
      .then(() => navigate(`/messenger/${chatRequest.id}`))
      .catch((err) => alert(err.message));
  }

  return (
    <div className="relative w-full px-5 space-y-2 bg-base-100 py-5 drop-shadow">
      <div className="flex items-center">
        <span className="text-xl font-bold underline italic">Chat Request</span>
        <span className="flex-grow" />
        <span className="text-sm mr-3">{time}</span>
        <span className="text-sm">{date}</span>
      </div>
      <div className="flex">
        <div className="w-1/2 flex flex-col justify-end">
          <div className="flex items-center">
            <span className="text-sm mr-2">HS Graduation Year:</span>
            <span className="text-success italic">{grad_year}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm mr-2">Topic:</span>
            <span className="text-success italic">{topic}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm mr-2">Status:</span>
            <span
              className={`italic ${
                status === "waiting" ? "text-warning" : "text-success"
              }`}
            >
              {status}
            </span>
          </div>
        </div>
        <div className="w-1/2 flex justify-end items-end">
          <button onClick={enterChat} className="btn btn-sm btn-success">
            Go To Chat
          </button>
        </div>
      </div>
    </div>
  );
}
