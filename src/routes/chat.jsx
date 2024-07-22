import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/loading/loading";
import { AppContext } from "../utils/context";

export default function Chat() {
  let { user, navigate } = useContext(AppContext);
  let [tos, setTos] = useState(false);
  let { type } = useParams();

  useEffect(() => {
    if (user === null) navigate("/auth");
  }, []);

  return (
    <div className="flex flex-col items-center h-full">
      {tos ? (
        type === "participant" ? (
          <Participant />
        ) : (
          <Volunteer />
        )
      ) : (
        <TOS setTos={setTos} />
      )}
    </div>
  );
}

function Participant() {
  let [queue, setQueue] = useState(parseInt(Math.random() * 10, 10));

  return (
    <div className="flex flex-col items-center h-full">
      <div className="h-1/4" />
      <Loading />
      <div className="text-xl font-bold">Please Wait</div>
      <div className="italic">A volunteer will be with you shortly</div>
      <div className="mt-5 italic">
        {queue === 1 ? (
          <div>
            There is <span className="font-bold">1</span> person in line...
          </div>
        ) : (
          <div className="tracking-widest">
            There are{" "}
            <span className="font-bold text-2xl text-success">{queue}</span>{" "}
            people in line...
          </div>
        )}
      </div>
    </div>
  );
}

function Volunteer() {
  return (
    <div>
      <Loading />
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
