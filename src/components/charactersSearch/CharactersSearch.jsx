import "./charactersSearch.css";

export const CharactersSearch = ({ handleFilter }) => {
  return (
    <input
      id="search"
      placeholder="Search here"
      type="search"
      onChange={handleFilter}
    ></input>
  );
};
