import "./charactersList.css";

export function CharactersList({ characters }) {
  // map: loop through the json data.
  return (
    <>
      <div className="characters-list-container">
        <table className="characters-list-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character, key) => {
              return (
                <tr key={key}>
                  <td>{character.name}</td>
                  <td>
                    <button>Read more</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination">
          <li>
            <button id="previousButton">Previous</button>
          </li>
          <li>
            <button id="nextButton">Next</button>
          </li>
        </ul>
      </nav>
    </>
  );
}
