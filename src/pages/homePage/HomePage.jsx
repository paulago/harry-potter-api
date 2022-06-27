import "./homePage.css";
import { CharactersSearch } from "../../components/charactersSearch/CharactersSearch";
import { CharactersList } from "../../components/charactersList/CharactersList";
import { useState, useMemo } from "react";

export function HomePage({ characters, setCharacters }) {
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredCharacters = useMemo(() => {
    if (!filter) return characters;

    return characters.filter((character) =>
      character.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [characters, filter]);

  return (
    <main className="home-page">
      <div className="home-container">
        <h2>List of Harry Potter Characters</h2>
        <CharactersSearch handleFilter={handleFilter} />
        <CharactersList
          characters={filteredCharacters}
          setCharacters={setCharacters}
        />
      </div>
    </main>
  );
}
