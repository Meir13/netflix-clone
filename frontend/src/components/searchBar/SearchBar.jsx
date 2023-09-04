import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBar.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getFilterUrl } from "../../services/filterUrl";

export const SearchBAr = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/search" && !query) return;

    const link = getFilterUrl({
      query: query || "",
    });

    if (link === "") {
      navigate("/");
      return;
    }

    navigate("/search?" + link);
  }, [query]);

  return (
    <div className="search-bar">
      <div className="icon">
        <SearchIcon />
      </div>

      <input
        type="text"
        placeholder="Titles, Genres"
        autoFocus
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </div>
  );
};
