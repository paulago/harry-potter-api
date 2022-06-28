import "./characterPage.css";
import { useParams } from "react-router-dom";

export function CharacterPage({ characters }) {
  const { name } = useParams();
  const character = characters.find((c) => c.id === name);

  return (
    <main className="character-page">
      <div className="character-container">
        {character.image === "" ? (
          ""
        ) : (
          <img className="character-image" src={character.image} alt="" />
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

          {character.patronus === "" ? (
            ""
          ) : (
            <p>
              <strong>Patronus: </strong>
              {character.patronus}
            </p>
          )}

          {character.hogwartsStudent === false ? (
            <p>
              <strong>Hogwarts Student: </strong>{" "}
              <span className="no-student">✕</span>
            </p>
          ) : (
            <p>
              <strong>Hogwarts Student: </strong>
              <span className="student">✓</span>
            </p>
          )}

          {character.hogwartsStaff === false ? (
            <p>
              <strong>Hogwarts Staff: </strong>
              <span className="no-staff">✕</span>
            </p>
          ) : (
            <p>
              <strong>Hogwarts Staff: </strong>
              <span className="staff">✓</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
