import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { HomePage } from "./pages/homePage/HomePage";
import { CharacterPage } from "./pages/characterPage/CharacterPage";
import { NotFoundPage } from "./pages/notFoundPage/NotFoundPage";
import { Footer } from "./components/footer/Footer";

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const urlAPI = "http://hp-api.herokuapp.com/api/characters";

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

  if (characters.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div className="App">
      {" "}
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
