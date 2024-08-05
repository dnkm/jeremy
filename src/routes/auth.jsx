import { useContext, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "../utils/context";

const TestAccounts = [
  {
    email: "admin@btree.com",
    password: "1234",
  },
  {
    email: "v1@btree.com",
    password: "1234",
  },
  {
    email: "v2@btree.com",
    password: "1234",
  },
];

export default function Auth() {
  let { user, navigate } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate("/volunteer");
  }, []);

  async function signIn(ev) {
    ev.preventDefault();
    let email = ev.target.email.value;
    let password = ev.target.password.value;

    await signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center drop-shadow rounded-lg bg-base-100 p-10 mt-10">
        <div className="text-xl font-bold mb-5">LOGIN</div>
        <form onSubmit={signIn} className="flex flex-col space-y-5 w-72">
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
          <button className="btn btn-sm btn-accent">Sign In</button>
        </form>
      </div>
      <div className="mt-10">
        <h1>Test Accounts</h1>
        <div className="flex space-x-5">
          {TestAccounts.map((t) => (
            <button
              key={t.email}
              className="btn btn-sm btn-primary"
              onClick={() =>
                signInWithEmailAndPassword(auth, t.email, t.password)
              }
            >
              {t.email}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
