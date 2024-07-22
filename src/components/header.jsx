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
      <div className="w-1/2 flex justify-center">
        <Link to="/" className="text-3xl font-bold tracking-widest">
          Helping Hand Foundation
        </Link>
      </div>
      <div className="w-1/4 flex justify-end ">
        {user ? (
          <Link onClick={signOut} className="mr-10 text-xl">
            Sign Out
          </Link>
        ) : (
          <Link className="mr-10 text-xl" to="/auth">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
