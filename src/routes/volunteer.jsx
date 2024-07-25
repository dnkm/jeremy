import { useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/context";
import { db } from "../utils/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function Volunteer() {
  let [profile, setProfile] = useState(undefined);
  let [notifications, setNotifications] = useState([{}]);
  let { user, navigate } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      getProfile();
      loadNotifications();
    } else navigate("/auth");
  }, [user]);

  async function getProfile() {
    let docRef = doc(db, "users", user?.uid);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  }

  async function loadNotifications() {
    let q = query(
      collection(db, "chats"),
      where("status", "==", "waiting"),
      orderBy("created_at")
    );
    onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => chats.push({ ...doc.data(), id: doc.id }));
      setNotifications(chats);
    });
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start h-full">
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="bg-base-300 drop-shadow h-20 flex items-center justify-center text-xl lg:text-2xl tracking-widest font-bold w-full lg:w-2/3">
          Total Volunteer Time
        </div>
        <div className="bg-white drop-shadow w-full lg:w-2/3 text-center text-xl italic py-5">
          <div>
            <span className="text-3xl text-success">8</span> hours
          </div>
          <div>
            <span className="text-2xl text-success">15</span> minutes
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <div className="bg-base-300 drop-shadow h-20 flex items-center justify-center text-xl lg:text-2xl tracking-widest font-bold w-full lg:w-2/3">
          Notifications
        </div>
        <div className="w-full lg:w-2/3">
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
    </div>
  );
}

function ChatRequest({ chatRequest, volunteer_id, navigate }) {
  let d = chatRequest?.created_at?.toDate();
  let time = d?.toLocaleTimeString();
  let date = d?.toLocaleDateString();
  let grad_year = chatRequest?.grad_year;
  let topic = chatRequest?.topic === "" ? "Unspecified" : chatRequest?.topic;

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
        <span className="text-2xl font-bold underline italic">
          Chat Request
        </span>
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
        </div>
        <div className="w-1/2 flex justify-end items-end">
          <button onClick={enterChat} className="btn btn-sm btn-success w-72">
            Go To Chat
          </button>
        </div>
      </div>
    </div>
  );
}
