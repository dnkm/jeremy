import { Route } from "react-router-dom";
import Auth from "../routes/auth";
import Home from "../routes/home";
import Chat from "../routes/chat";
import Team from "../routes/team";
import Faq from "../routes/faq";
import Partner from "../routes/partner";
import Contact from "../routes/contact";

const routes = [
  { element: <Home />, path: "/" },
  { element: <Auth />, path: "/auth" },
  { element: <Chat />, path: "/chat/:type" },
  { element: <Contact />, path: "/contact" },
  { element: <Partner />, path: "/partner" },
  { element: <Team />, path: "/team" },
  { element: <Faq />, path: "/faq" },
];

export { routes };
