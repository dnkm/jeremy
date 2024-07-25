import { useContext, useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { AppContext } from "../utils/context";

export default function Queue() {
  let { navigate } = useContext(AppContext);
  let { chatId } = useParams();
  let [queue, setQueue] = useState(0);

  useEffect(() => {
    loadChatRequests();
  }, []);

  async function loadChatRequests() {
    let q = query(
      collection(db, "chats"),
      where("status", "==", "waiting"),
      orderBy("created_at")
    );
    onSnapshot(q, (querySnapshot) => {
      let chatRequests = [];
      querySnapshot.forEach((doc) =>
        chatRequests.push({ ...doc.data(), id: doc.id })
      );
      let index = -1;
      for (let i = 0; i < chatRequests.length; i++) {
        if (chatRequests[i].id === chatId) index = i;
      }
      if (index === -1) navigate(`/messenger/${chatId}`);
      else setQueue(index);
    });
  }

  return (
    <div className="flex flex-col items-center h-full">
      <div className="h-1/4" />
      <Loading />
      <div className="text-xl font-bold">Please Wait</div>
      <div className="italic">A volunteer will be with you shortly</div>
      <div className="mt-5 italic">
        {queue === 1 ? (
          <div>
            There is{" "}
            <span className="font-bold text-2xl text-success mx-0.5">1</span>{" "}
            person in line...
          </div>
        ) : (
          <div className="tracking-widest">
            There are{" "}
            <span className="font-bold text-2xl text-success mx-0.5">
              {queue}
            </span>{" "}
            people in line...
          </div>
        )}
      </div>
      {queue === 0 && (
        <div className="mt-5 bold italic text-xl">
          You are <span className="text-success">next</span>!
        </div>
      )}
    </div>
  );
}
