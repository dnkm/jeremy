import { useContext } from "react";
import { AppContext } from "../utils/context";
import { Link } from "react-router-dom";

export default function Home() {
  let { user } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-cover bg-center h-96 w-full"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1562552052-dbdd31c06339?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      ></div>
      <div
        className="relative bg-white drop-shadow h-24 flex items-center justify-center text-3xl tracking-widest font-bold w-full lg:w-2/3"
        style={{ top: "-3rem" }}
      >
        The Helping Hand Foundation
      </div>
      <div className="relative w-full lg:w-2/3 px-5 space-y-2 bg-base-100 py-5 drop-shadow">
        <div className="text-2xl font-bold underline italic">About Us</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>

      <div className="p-10 space-y-5 flex flex-col items-center">
        {user ? (
          <>
            <Link to="/chat/participant" className="btn btn-primary w-72">
              Chat As Participant
            </Link>
            <Link to="/chat/volunteer" className="btn btn-secondary w-72">
              Chat As Volunteer
            </Link>
          </>
        ) : (
          <Link to="/auth" className="btn btn-primary">
            Click Here To Login
          </Link>
        )}
      </div>
    </div>
  );
}
