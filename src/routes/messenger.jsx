import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/loading/loading";

export default function Messenger() {
  let { chatId } = useParams();
  let [queue, setQueue] = useState(parseInt(Math.random() * 9 + 1, 10));

  console.log(chatId);

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
    </div>
  );
}
