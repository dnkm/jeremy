import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="h-20 flex justify-center items-center drop-shadow">
      <Link className="mx-2" to="/team">
        Our Team
      </Link>
      <Link className="mx-2" to="/partner">
        Partners
      </Link>
      <Link className="mx-2" to="/faq">
        FAQ
      </Link>
    </div>
  );
}
