import "./charactersList.css";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export function CharactersList({ characters, setCharacters }) {
  const pageLimit = 5;
  const charactersLimit = 20;

  // Para calcular el número total de páginas poniendo X personajes en cada una.
  const getTotalPages = useCallback(() => {
    return Math.ceil(characters.length / charactersLimit);
  }, [characters]);

  const [pages, setPages] = useState(getTotalPages());
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    setPages(getTotalPages());
    setCurrentPage(1);
  }, [characters, getTotalPages]);

  // Para ir a la página anterior.
  function handlePrevPage() {
    setCurrentPage((page) => page - 1);
  }

  // Para ir a la página siguiente.
  function handleNextPage() {
    setCurrentPage((page) => page + 1);
  }

  // Cuando el usuario haga clic en cualquier número de página, cambiará la página actual al número de página en el que hizo clic.
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  // Devuelve los personajes que se mostrarán en cada página.
  const getPaginatedData = () => {
    const startIndex = currentPage * charactersLimit - charactersLimit;
    const endIndex = startIndex + charactersLimit;
    return characters.slice(startIndex, endIndex);
  };

  // Para representar los números de página que se mostrarán (en este caso el pageLimit es 5).
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(Math.min(pages - start, pageLimit))
      .fill()
      .map((_, index) => start + index + 1);
  };

  // Para ordenar de manera ascendente y descendente la columna de los nombres de los personajes.
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...characters].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setCharacters(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...characters].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setCharacters(sorted);
      setOrder("ASC");
    }
  };

  return (
    <>
      <div className="characters-list-container">
        <table className="characters-list-table">
          <thead>
            <tr>
              <th onClick={() => sorting("name")}>
                NAME {order === "ASC" ? "↑" : "↓"}
              </th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((character, index) => {
              return (
                <tr key={index}>
                  <td>{character.name}</td>
                  <td>
                    <Link
                      className="character-link"
                      to={`/character/${character.id}`}
                    >
                      Read more
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <ul className="pagination">
          <li>
            <button
              id="prevButton"
              onClick={handlePrevPage}
              className={`prev ${currentPage === 1 ? "disabled" : ""}`}
            >
              Previous
            </button>
          </li>
          <li>
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? "active" : null
                }`}
              >
                <span>{item}</span>
              </button>
            ))}
          </li>
          <li>
            <button
              id="nextButton"
              onClick={handleNextPage}
              className={`next ${currentPage === pages ? "disabled" : ""}`}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
