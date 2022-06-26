import "./characterPage.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function CharacterPage() {
  const { key } = useParams();
  const [character, setCharacter] = useState({});

  return (
    <div key={key}>
      <h2>{character.name}</h2>
      <img alt="">{character.image}</img>
      <p>{character.house}</p>
      <p>{character.dateOfBirth}</p>
    </div>
  );
}
