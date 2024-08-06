import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useContext } from "react";
import { AppContext } from "../utils/context";

export default function Signup() {
  const { navigate } = useContext(AppContext);
  function signUp(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      event.target.email.value,
      event.target.password.value
    )
      .then(() => {
        alert("Account created!");
        navigate("/volunteer");
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="flex flex-col items-center space-y-5">
      <div className="flex flex-col items-center drop-shadow rounded-lg bg-base-100 p-10 mt-10">
        <div className="text-xl font-bold mb-5">Sign Up</div>
        <form onSubmit={signUp} className="flex flex-col space-y-5 w-72">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-primary input-sm focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-primary input-sm focus:outline-none"
          />
          <button className="btn btn-sm btn-accent">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
