import "./homePage.css";
import { CharactersSearch } from "../../components/charactersSearch/CharactersSearch";
import { CharactersList } from "../../components/charactersList/CharactersList";
import { useState, useEffect } from "react";

export function HomePage({ characters }) {
  const [filter, setFilter] = useState("");
  const [characterList, setCharacterList] = useState(characters);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    setCharacterList(
      filter
        ? characters.filter((character) =>
            character.name.toLowerCase().includes(filter.toLowerCase())
          )
        : characters
    );
  }, [filter, characters]);

  return (
    <main className="home-page">
      <div className="home-container">
        <h2>List of Harry Potter Characters</h2>
        <CharactersSearch handleFilter={handleFilter} />
        <CharactersList
          characters={characterList}
          setCharacters={setCharacterList}
        />
      </div>
    </main>
  );
}
