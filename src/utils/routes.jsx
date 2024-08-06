import Auth from "../routes/auth";
import Home from "../routes/home";
import Team from "../routes/team";
import Faq from "../routes/faq/faq";
import Partner from "../routes/partner";
import Messenger from "../routes/messenger";
import Volunteer from "../routes/volunteer/volunteer";
import ChatRequest from "../routes/chat-request";
import Queue from "../routes/queue";
import Admin from "../routes/volunteer/admin";
import Signup from "../routes/signup";

const routes = [
  { element: <Home />, path: "/" },
  { element: <Auth />, path: "/auth" },
  { element: <Signup />, path: "/signup" },
  { element: <ChatRequest />, path: "/chat-request" },
  { element: <Partner />, path: "/partner" },
  { element: <Team />, path: "/team" },
  { element: <Faq />, path: "/faq" },
  { element: <Messenger />, path: "/messenger/:chatId" },
  { element: <Volunteer />, path: "/volunteer" },
  { element: <Queue />, path: "/queue/:chatId" },
  { element: <Admin />, path: "/admin" },
];

export { routes };
