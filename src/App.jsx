import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./utils/routes";
import Header from "./components/header";
import { useEffect, useState } from "react";
import Footer from "./components/footer";
import { AppContext } from "./utils/context";
import { auth, db } from "./utils/firebase";
import { doc, getDoc } from "firebase/firestore";

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
        getDoc(doc(db, "users", user?.uid)).then((profileSnap) => {
          if (profileSnap.exists()) setProfile(profileSnap.data());
          Navigate("/volunteer");
        });
      }
      setUser(user);
    });
  }, []);

  return (
    <AppContext.Provider value={{ user, profile, setUser, navigate }}>
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
