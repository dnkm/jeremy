import { useContext, useEffect } from "react";
import { AppContext } from "../../utils/context";
import Notifications from "./notifications";
import Profile from "./profile";
import { Link } from "react-router-dom";

export default function Volunteer() {
  let { user, profile, navigate } = useContext(AppContext);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  if (!user) return null;
  if (!profile)
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

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {profile && <Profile user={user} navigate={navigate} />}
      {/* {user && <Notifications user={user} navigate={navigate} />} */}
    </div>
  );
}
