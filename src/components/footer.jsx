import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="h-20 flex justify-center items-center drop-shadow space-x-8">
      <Link to="/team">Our Team</Link>
      <Link to="/partner">Partners</Link>
      <a href="mailto:helpinghand@gmail.com">Contact Us</a>
      <Link to="/faq">FAQ</Link>
    </div>
  );
}
