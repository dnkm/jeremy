import { and, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

export default function Profile({ user, navigate }) {
    let [profile, setProfile] = useState(undefined);
    let [time, setTime] = useState(undefined);

    useEffect(() => {
        getProfile();
        loadStats();
    }, [])

    async function getProfile() {
        let docRef = doc(db, "users", user?.uid);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists())
            setProfile(docSnap.data());

    }

    async function loadStats() {
        let q = query(collection(db, "chats"), and(where("status", "==", "closed"), where("volunteer_id", "==", user?.uid)));
        let snapshot = await getDocs(q);
        let total = 0;
        snapshot.docs.forEach(doc => {
            let chat = doc.data();
            let start = chat.created_at.toDate();
            let end = chat.closed_at.toDate();
            let diff = Math.abs(end - start);
            let minutes = Math.floor((diff / 1000) / 60);
            total += minutes;
        });
        setTime(total);

        updateDoc(doc(db, "users", user?.uid), {
            volunteer_time: total
        });
    }


    return (
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:h-full">
            <div className="bg-base-300 h-20 flex items-center justify-center text-xl lg:text-2xl tracking-widest font-bold w-full">
                Profile
            </div>
            <div className="flex-grow flex flex-col bg-white w-full text-center py-5 space-y-3">
                <div className="flex items-center w-full px-5">
                    <div className="font-bold italic mr-5">Name: </div>
                    <div>{profile?.first_name} {profile?.last_name}</div>
                </div>
                <div className="flex items-center w-full px-5">
                    <div className="font-bold italic mr-5">School: </div>
                    <div>{profile?.school}</div>
                </div>
                <div className="flex items-center w-full px-5">
                    <div className="font-bold italic mr-5">Graduation Year: </div>
                    <div>{profile?.grad_year}</div>
                </div>
                <div className="flex items-center w-full px-5">
                    <div className="font-bold italic mr-5">E-mail: </div>
                    <div>{profile?.email}</div>
                </div>
                <div className="flex items-center w-full px-5">
                    <div className="font-bold italic mr-5">Phone Number: </div>
                    <div>{profile?.phone_number}</div>
                </div>
                <div className="flex items-center w-full px-5">
                    <div className="font-bold italic mr-5">Total Volunteer Time: </div>
                    <div className="flex item-center space-x-2">
                        <div>
                            <span className="text-2xl text-success mr-1">{Math.floor(time / 60)}</span>{`hour${Math.floor(time / 60) !== 1 && "s"}`}
                        </div>
                        <div>
                            <span className="text-2xl text-success mr-1">{time % 60}</span>{`minute${time % 60 !== 1 && "s"}`}
                        </div>
                    </div>
                </div>
                {profile?.isAdmin && <div><button className="btn btn-primary btn-sm" onClick={() => navigate(`/admin`)}>View Admin Page</button></div>}
            </div>
        </div>
    );
}
