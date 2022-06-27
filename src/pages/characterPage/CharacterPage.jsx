import "./characterPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function CharacterPage({ characters }) {
  const { key } = useParams();
  const character = characters[key];
  console.log(characters);
  console.log(key);

  return (
    <main className="character-page">
      <div key={key}>
        <h2>{character.name}</h2>

        <p>{character.house}</p>
        <p>{character.dateOfBirth}</p>
      </div>
    </main>
  );
}
