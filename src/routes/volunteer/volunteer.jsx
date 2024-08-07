import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../utils/context";
import Profile from "./profile";
import Notifications from "./notifications";

export default function Volunteer() {
  let { user, profile } = useContext(AppContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  if (!user || !profile) return <WaitForApproval />;

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {profile && <Profile user={user} />}
      {user && <Notifications user={user} />}
    </div>
  );
}

function WaitForApproval() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Need an approval</h2>
          <p>Please wait until your profile is approved</p>
          <div className="card-actions justify-end">
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
