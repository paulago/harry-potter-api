import "./homePage.css";
import { CharactersSearch } from "../../components/charactersSearch/CharactersSearch";
import { CharactersList } from "../../components/charactersList/CharactersList";
import { useEffect, useState, useCallback, useMemo } from "react";

export function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [filter, setFilter] = useState("");

  const urlAPI = "http://hp-api.herokuapp.com/api/characters";

  useEffect(() => {
    fetch(urlAPI)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Something went wrong while requesting characters");
      })
      .then((data) => {
        setCharacters(data);
        console.log(data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const handleFilter = useCallback((e) => {
    setFilter(e.target.value);
  }, []);

  const filteredCharacters = useMemo(() => {
    if (!filter) return characters;

    return characters.filter((character) =>
      character.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [characters, filter]);

  return (
    <div className="home-container">
      <h2>List of Harry Potter characters</h2>
      <CharactersSearch handleFilter={handleFilter} />
      <CharactersList characters={filteredCharacters} />
    </div>
  );
}
