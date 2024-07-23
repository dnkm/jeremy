import { useContext, useState } from "react";
import { AppContext } from "../utils/context";

export default function Chat() {
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
    let grad_year = ev.target.grad_year.value;
    let topic = ev.target.topic.value;

    let chatId = parseInt(Math.random() * 100000, 10);

    navigate(`/messenger/${chatId}`);
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

function TOS({ setTos }) {
  return (
    <>
      <div className="h-1/4" />
      <div className="relative w-full lg:w-2/3 px-5 bg-base-100 py-5 drop-shadow">
        <div className="text-2xl font-bold underline italic mb-2">
          Terms of Service
        </div>
        <div className="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="flex justify-center">
          <button
            className="btn btn-primary px-10"
            onClick={() => setTos(true)}
          >
            I Agree
          </button>
        </div>
      </div>
    </>
  );
}
