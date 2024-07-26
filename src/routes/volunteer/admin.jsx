import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/context";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Modal from "../../components/modal";

export default function Admin() {
  let { user, navigate } = useContext(AppContext);
  let [profile, setProfile] = useState(undefined);
  let [viewProfile, setViewProfile] = useState(undefined);

  useEffect(() => {
    if (user) getProfile();
    else navigate(`/auth`);
  }, [user]);

  async function getProfile() {
    let docRef = doc(db, "users", user?.uid);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) setProfile(docSnap.data());
  }

  if (typeof profile === undefined) return <div />;
  if (profile && profile.is_admin === false) navigate(`/volunteer`);

  return (
    <div className="relative">
      <div className="bg-base-300 text-xl text-center font-bold py-3">
        Admin Page
      </div>
      <Users setViewProfile={setViewProfile} />
      {typeof viewProfile !== "undefined" && (
        <Modal close={() => setViewProfile(undefined)}>
          {typeof viewProfile !== "undefined" && (
            <Account profile={viewProfile} />
          )}
        </Modal>
      )}
    </div>
  );
}

function Users({ setViewProfile }) {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    let q = query(collection(db, "users"));
    let snapshot = await getDocs(q);
    let u = [];
    snapshot.docs.forEach((doc) => u.push({ ...doc.data(), id: doc.id }));
    setUsers(u);
  }

  return (
    <>
      <div></div>
      <div className="divider">
        <span>All Users</span>
        <button
          onClick={() => setViewProfile({})}
          className="btn btn-info btn-xs"
        >
          Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Volunteer Time</th>
              <th>E-mail</th>
              <th>Phone Number</th>
              <th>Graduation Year</th>
              <th></th>
            </tr>
          </thead>
          {users.map((user, i) => (
            <User key={user.id} user={user} setViewProfile={setViewProfile} />
          ))}
        </table>
      </div>
    </>
  );
}

function User({ user, setViewProfile }) {
  let time = user?.volunteer_time || 0;
  let hours = Math.floor(time / 60);
  let minutes = Math.floor(time % 60);

  return (
    <tr>
      <td>{user?.first_name + " " + user?.last_name}</td>
      <td>
        {hours}h {minutes}m
      </td>
      <td>{user?.email}</td>
      <td>{user?.phone_number}</td>
      <td>{user?.grad_year}</td>
      <td>
        <button
          onClick={() => setViewProfile(user)}
          className="btn btn-primary btn-xs"
        >
          View Account
        </button>
      </td>
    </tr>
  );
}

function Account({ profile }) {
  let first_name = profile?.first_name;
  let last_name = profile?.last_name;
  let grad_year = profile?.grad_year;
  let email = profile?.email;
  let phone_number = profile?.phone_number;
  let is_admin = profile?.is_admin;
  let school = profile?.school;

  async function submit(ev) {
    ev.preventDefault();
    let first_name = ev.target.first_name.value;
    let last_name = ev.target.last_name;
    let school = ev.target.school;
    let grad_year = parseInt(ev.target.grad_year);
    let email = ev.target.email;
    let password = ev.target.password;
    let phone_number = ev.target.phone_number;
    let is_admin = ev.target.is_admin === "Yes";

    if (profile?.id) {
    } else {
    }
  }

  return (
    <form
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
      }}
      className="w-full lg:w-2/3 p-5 drop-shadow bg-base-100 grid grid-cols-2 gap-2"
    >
      <div>
        <div className="mr-2">First Name: </div>
        <input
          defaultValue={first_name}
          name="first_name"
          className="input input-primary input-sm w-full"
        />
      </div>
      <div>
        <div className="mr-2">Last Name: </div>
        <input
          defaultValue={last_name}
          name="last_name"
          className="input input-primary input-sm w-full"
        />
      </div>
      <div>
        <div className="mr-2">School: </div>
        <input
          defaultValue={school}
          name="school"
          className="input input-primary input-sm w-full"
        />
      </div>
      <div>
        <div className="mr-2">Graduation Year: </div>
        <input
          defaultValue={grad_year}
          name="grad_year"
          type="number"
          className="input input-primary input-sm w-full"
        />
      </div>
      <div>
        <div className="mr-2">E-mail: </div>
        <input
          defaultValue={email}
          name="email"
          type="email"
          className="input input-primary input-sm w-full"
        />
      </div>
      <div>
        <div className="mr-2">Password (Minimum 6 Characters): </div>
        <input
          disabled={profile?.id}
          name="password"
          className="input input-primary input-sm w-full"
        />
      </div>
      <div>
        <div className="mr-2">Phone Number: </div>
        <input
          defaultValue={phone_number}
          name="phone_number"
          className="input input-primary input-sm w-full"
        />
      </div>
      <div>
        <div className="mr-2">Admin: </div>
        <select
          className="select select-primary select-sm"
          defaultValue={is_admin ? "Yes" : "No"}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div>
        <button className="btn btn-sm btn-success">
          {profile?.id ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}
