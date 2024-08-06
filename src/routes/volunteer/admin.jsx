import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/context";
import { db } from "../../utils/firebase";
import Modal from "../../components/modal";

export default function Admin() {
  let { profile, navigate } = useContext(AppContext);
  if (typeof profile === undefined) return <div />;
  if (!profile || profile.is_admin === false) navigate(`/volunteer`);
  console.log("profile", profile);

  return (
    <div className="relative">
      <div className="bg-base-300 text-xl text-center font-bold py-3">
        Admin Page
      </div>
      <Users />
    </div>
  );
}

function Users() {
  let [users, setUsers] = useState([]);
  let [viewProfile, setViewProfile] = useState(undefined);

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
              <th>Type</th>
              <th>Name</th>
              <th>Volunteer Time</th>
              <th>E-mail</th>
              <th>Phone Number</th>
              <th>Graduation Year</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <User key={user.id} user={user} setViewProfile={setViewProfile} />
            ))}
          </tbody>
        </table>
      </div>
      {typeof viewProfile !== "undefined" && (
        <Modal close={() => setViewProfile(undefined)}>
          {typeof viewProfile !== "undefined" && (
            <AccountForm profile={viewProfile} key={viewProfile?.email} />
          )}
        </Modal>
      )}
    </>
  );
}

function User({ user, setViewProfile }) {
  let time = user?.volunteer_time || 0;
  let hours = Math.floor(time / 60);
  let minutes = Math.floor(time % 60);

  return (
    <tr>
      <td>
        <div>
          {user?.is_admin ? (
            <div className="badge badge-sm badge-success">Admin</div>
          ) : (
            <div className="badge badge-sm badge-primary">Volunteer</div>
          )}
        </div>
      </td>
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

function AccountForm({ profile }) {
  let first_name = profile?.first_name;
  let last_name = profile?.last_name;
  let grad_year = profile?.grad_year;
  let email = profile?.email;
  let phone_number = profile?.phone_number;
  let is_admin = profile?.is_admin;
  let school = profile?.school;

  async function onSubmit(ev) {
    ev.preventDefault();
    let data = Object.fromEntries(new FormData(ev.target));
    data.is_admin = data.is_admin === "Yes";

    if (profile?.id) {
      // update
    } else {
      // create user in user table
      let prof = await addDoc(collection(db, "users"), data);
      alert("User Created");
    }
  }

  return (
    <form
      onClick={(ev) => ev.stopPropagation()}
      onSubmit={onSubmit}
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
          name="is_admin"
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="col-span-2 flex justify-center">
        <button className="btn btn-sm btn-primary">
          {profile?.id ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}
