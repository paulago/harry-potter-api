import "./characterPage.css";
import { useParams } from "react-router-dom";

export function CharacterPage({ characters }) {
  const { key } = useParams();
  const character = characters[key];
  console.log(characters);
  console.log(key);

  return (
    <main className="character-page">
      <div className="character-container" key={key}>
        <img src={character.image} alt="" />
        <h2>{character.name}</h2>
        <p>House: {character.house}</p>
        <p>Date of birth: {character.dateOfBirth}</p>
        <p>Ancestry: {character.ancestry}</p>
        <p>
          Wand: {character.wand.wood} and {character.wand.core}
        </p>
      </div>
    </main>
  );
}
