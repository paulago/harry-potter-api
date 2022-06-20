import "./header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <h1>
        <Link to={"/characters"}>Harry Potter App</Link>
      </h1>
    </header>
  );
}
