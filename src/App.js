import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { HomePage } from "./pages/homePage/HomePage";
import { CharacterPage } from "./pages/characterPage/CharacterPage";
import { NotFoundPage } from "./pages/notFoundPage/NotFoundPage";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      {" "}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
