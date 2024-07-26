import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/context";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../utils/firebase";

export default function Admin() {
    let { user, navigate } = useContext(AppContext);
    let [profile, setProfile] = useState(undefined);

    useEffect(() => {
        if (user) getProfile();
        else navigate(`/auth`);
    }, [user])

    async function getProfile() {
        let docRef = doc(db, "users", user?.uid);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists())
            setProfile(docSnap.data());
    }

    if (typeof profile === undefined) return <div />;
    if (profile && profile.is_admin === false) navigate(`/volunteer`);

    return (
        <div>
            <div className="bg-base-300 text-xl text-center font-bold py-3">Admin Page</div>
            <Users />
        </div>
    );
}

function Users() {

    let [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        let q = query(collection(db, "users"));
        let snapshot = await getDocs(q);
        let u = []
        snapshot.docs.forEach(doc => u.push({ ...doc.data(), id: doc.id }));
        setUsers(u);
    }


    return (
        <>
            <div>
            </div>
            <div className="divider">
                <span>All Users</span>
                <button className="btn btn-info btn-xs">Add User</button>
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
                    {users.map((user, i) => <User key={user.id} user={user} index={i + 1} />)}
                </table>
            </div>
        </>
    )
}

function User({ user, index }) {

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
                <button className="btn btn-primary btn-sm">View Account</button>
            </td>
        </tr>
    );
}

function CreateAccount() {

    return (

        <div></div>
    );
}