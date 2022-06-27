import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { HomePage } from "./pages/homePage/HomePage";
import { CharacterPage } from "./pages/characterPage/CharacterPage";
import { NotFoundPage } from "./pages/notFoundPage/NotFoundPage";
import { Footer } from "./components/footer/Footer";
import slugify from "slugify";

function App() {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const urlAPI = "http://hp-api.herokuapp.com/api/characters";

        const response = await fetch(urlAPI);

        if (!response.ok) {
          setError("Error cargando personajes");
        } else {
          const data = await response.json();
          setCharacters(
            data.map((character) => {
              return { ...character, id: slugify(character.name) };
            })
          );
        }
      } catch (error) {
        setError("Error general");
      }
    };
    loadCharacters();
  }, []);

  if (error) return <p>{error}</p>;

  if (characters.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage characters={characters} setCharacters={setCharacters} />
          }
        />
        <Route
          path="/character/:key"
          element={<CharacterPage characters={characters} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
