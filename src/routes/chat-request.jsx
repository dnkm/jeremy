import { addDoc, collection, doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { AppContext } from "../utils/context";
import TOS from "../components/tos";
import { db } from "../utils/firebase";

export default function ChatRequest() {
  let [tos, setTos] = useState(false);

  return (
    <div className="flex flex-col items-center h-full">
      {tos ? <Topic /> : <TOS setTos={setTos} />}
    </div>
  );
}

const TOPICS = [
  "",
  "Family Issues",
  "LGBTQ+",
  "Academic Stress",
  "Loss of Loved One",
  "Relationships/Dating",
  "Homesick",
  "Bullying/Discrimination",
  "Other",
];

function Topic() {
  let { navigate } = useContext(AppContext);

  async function chatRequest(ev) {
    ev.preventDefault();
    let grad_year = parseInt(ev.target.grad_year.value);
    let topic = ev.target.topic.value;

    const docRef = await addDoc(collection(db, "chats"), {
      created_at: new Date(),
      grad_year,
      topic,
      volunteer_id: "",
      status: "waiting",
    });

    navigate(`/queue/${docRef.id}`);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-1/4" />
      <form
        onSubmit={chatRequest}
        className="bg-base-100 drop-shadow p-10 flex flex-col justify-center items-center"
      >
        <div className="font-bold text-xl">High School Graduation Year</div>
        <input
          name="grad_year"
          type="number"
          className="input input-primary focus:outline-none w-full"
        />
        <div className="font-bold text-xl mt-3">
          Topic to Discuss{" "}
          <span className="text-sm italic">(Leave Blank If Unsure)</span>
        </div>
        <select name="topic" className="select select-primary w-full">
          {TOPICS.map((topic, i) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <button className="btn btn-primary mt-5 w-full">Request Chat</button>
      </form>
    </div>
  );
}
