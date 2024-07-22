import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "./utils/routes";
import Header from "./components/header";
import { useState } from "react";
import Footer from "./components/footer";
import { AppContext } from "./utils/context";

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
  const navigate = useNavigate();

  return (
    <AppContext.Provider value={{ user, setUser, navigate }}>
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
