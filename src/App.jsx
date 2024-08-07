import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./utils/routes";
import Header from "./components/header";
import { useEffect, useState } from "react";
import Footer from "./components/footer";
import { AppContext } from "./utils/context";
import { auth, db } from "./utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {routes.map((route) => (
          <Route key={route.path} element={route.element} path={route.path} />
        ))}
      </Route>
    </Routes>
  );
}

function Main() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let q = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );

        getDocs(q).then((profileSnap) => {
          if (profileSnap.docs.length > 0) {
            let profile = profileSnap.docs[0];
            setProfile({ id: profile.id, ...profile.data() });
          }
          navigate("/volunteer");
        });
      }
      setUser(user);
    });
  }, []);

  return (
    <AppContext.Provider value={{ user, profile, setProfile, setUser, navigate }}>
      <div className="min-h-screen" data-theme={theme}>
        <Header />
        <div
          className="bg-base-200"
          style={{ height: "1px", minHeight: "calc(100vh - 10rem)" }}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}
