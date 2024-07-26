import { useContext, useEffect } from "react";
import { AppContext } from "../../utils/context";
import Notifications from "./notifications";
import Profile from "./profile";

export default function Volunteer() {
  let { user, navigate } = useContext(AppContext);

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);


  return (
    <div className="flex flex-col lg:flex-row h-full">
      {user && <Profile user={user} navigate={navigate} />}
      {user && <Notifications user={user} navigate={navigate} />}
    </div>
  );
}


