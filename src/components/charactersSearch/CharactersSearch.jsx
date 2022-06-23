import "./charactersSearch.css";
import { memo } from "react";

export const CharactersSearch = memo(({ handleFilter }) => {
  return (
    <input
      id="search"
      placeholder="Search here"
      type="search"
      onChange={handleFilter}
    ></input>
  );
});
