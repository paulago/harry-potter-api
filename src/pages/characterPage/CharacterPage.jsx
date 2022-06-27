import "./characterPage.css";
import { useParams } from "react-router-dom";

export function CharacterPage({ characters }) {
  const { key } = useParams();
  const character = characters.find((c) => c.id === key);
  console.log(characters);
  console.log(key);

  return (
    <main className="character-page">
      <div className="character-container" key={key}>
        {character.image === "" ? (
          ""
        ) : (
          <img className="image-character" src={character.image} alt="" />
        )}
        <div className="character-info">
          <h2>{character.name}</h2>
          {character.house === "" ? (
            ""
          ) : (
            <p>
              <strong>House: </strong>
              {character.house}
            </p>
          )}

          {character.dateOfBirth === "" ? (
            ""
          ) : (
            <p>
              <strong>Date of birth: </strong>
              {character.dateOfBirth}
            </p>
          )}

          {character.ancestry === "" ? (
            ""
          ) : (
            <p>
              <strong>Ancestry: </strong>
              {character.ancestry}{" "}
            </p>
          )}

          {character.wand.wood || character.wand.core === "" ? (
            ""
          ) : (
            <p>
              <strong>Wand: </strong>
              {character.wand.wood} and {character.wand.core}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
