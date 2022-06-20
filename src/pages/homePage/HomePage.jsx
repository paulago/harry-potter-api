import "./homePage.css";
import { CharactersList } from "../../components/charactersList/CharactersList";

export function HomePage() {
  return (
    <div>
      <h2>List of Harry Potter characters</h2>
      <CharactersList />
    </div>
  );
}
