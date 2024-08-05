import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../utils/context";
import { auth } from "../utils/firebase";

export default function Header() {
  let { user, navigate } = useContext(AppContext);

  async function signOut() {
    await auth.signOut();
    navigate("/auth");
  }

  return (
    <div className="h-20 bg-base-100 flex items-center drop-shadow">
      <div className="w-1/4" />
      <div className="flex-grow flex justify-center">
        <Link to="/" className="text-2xl lg:text-3xl font-bold tracking-widest">
          The Helping Hand Foundation
        </Link>
      </div>
      <div className="w-1/4 flex justify-end">
        {user ? (
          <Link onClick={signOut} className="btn btn-primary mr-10">
            Sign Out
          </Link>
        ) : (
          <Link to="/auth" className="btn btn-primary mr-10">
            Volunteer Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
