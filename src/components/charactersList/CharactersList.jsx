import "./charactersList.css";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export function CharactersList({ characters, setCharacters }) {
  const pageLimit = 5;
  const charactersLimit = 20;

  const getTotalPages = useCallback(() => {
    return Math.ceil(characters.length / charactersLimit);
  }, [characters]);
  // pages es el número total de páginas. Esto se calcula dividiendo la longitud del array de los personajes entre el límite de personajes que se mostrarán por página (20).
  const [pages, setPages] = useState(getTotalPages());
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    setPages(getTotalPages());
    setCurrentPage(1);
    // setOrder('ASC');
  }, [characters, getTotalPages]);

  function handlePrevPage() {
    setCurrentPage((page) => page - 1);
  }

  function handleNextPage() {
    setCurrentPage((page) => page + 1);
  }

  // changePage: cuando el usuario haga clic en cualquier número de página, cambiará la página actual al número de página en el que hizo clic.
  // Con event.target.textContent extraemos el número de página del botón de paginación en el que hizo clic el usuario. Y el método Number() convierte ese valor/contenido en un número.
  // Y se cambia el estado de la página actual.
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  // getPaginatedData devuelve el número de personajes igual al límite de datos (20 personajes en este caso), que luego se mostrará al usuario en cada página.
  // El método slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido).
  // Para decidir qué 20 publicaciones mostrar, la función getPaginatedData calcula los índices de inicio y fin.
  const getPaginatedData = () => {
    const startIndex = currentPage * charactersLimit - charactersLimit;
    const endIndex = startIndex + charactersLimit;
    return characters.slice(startIndex, endIndex);
  };

  // getPaginationGroup: esta función es para representar los números de página que se le mostrarán al usuario. Yo he establecido como pageLimit 5, por lo que se mostrará al usuario 5 números de página a la vez.
  // Esta función primero calcula el punto de partida que se utilizará para mostrar los números de página subsiguientes. Por ejemplo, si start es 0, esta función devolverá este array: [1, 2, 3, 4, 5];
  // Retorna un nuevo array. New Array () es un contructor, no un array literal. Y al pasar un número como parámetro entre paréntesis, eso establece la longitud del nuevo array.
  // Y lo rellena con el método .fill(). Con .map() crea un nuevo array con los números de las páginas que se van a mostrar.
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(Math.min(pages - start, pageLimit))
      .fill()
      .map((_, index) => start + index + 1);
  };

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
                  <td className="link-column">
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
