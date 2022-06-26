import "./charactersList.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CharactersList({ characters, setCharacters }) {
  const pageLimit = 5;
  const charactersLimit = 20;

  const [pages] = useState(Math.round(characters.length / charactersLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("ASC");
  const navigate = useNavigate();

  function handlePrevPage() {
    setCurrentPage((page) => page - 1);
  }

  function handleNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * charactersLimit - charactersLimit;
    const endIndex = startIndex + charactersLimit;
    return characters.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
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

  function handleClick(index) {
    navigate("/character/" + index);
  }

  return (
    <>
      <div className="characters-list-container">
        <table className="characters-list-table">
          <thead>
            <tr>
              <th onClick={() => sorting("name")}>NAME</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((character, index) => {
              return (
                <tr key={index}>
                  <td>{character.name}</td>
                  <td>
                    <button onClick={() => handleClick(index)}>
                      Read more
                    </button>
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
