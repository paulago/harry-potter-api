import "./header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <h1>
        <Link to={"/"}>
          <img
            className="hp-logo"
            src={process.env.PUBLIC_URL + "/logo-harry-potter.png"}
            alt="harry potter logo"
          />
        </Link>
      </h1>
    </header>
  );
}
