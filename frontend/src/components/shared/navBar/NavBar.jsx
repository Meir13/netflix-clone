import "./NavBar.scss";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContext, useState } from "react";
import { signOut } from "../../../auth/authActions";
import { AuthContext } from "../../../auth/AuthContext";

const HEADER_ITEMS = [
  { title: "Home", path: "/" },
  { title: "Movies", path: "/movies" },
  { title: "TV Shows", path: "/series" },
];

const NavBar = () => {
  const { dispatch } = useContext(AuthContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [background, setBackground] = useState("");

  const toggleDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  const toggleShowLogOut = () => {
    setShowLogOut(!showLogOut);
  };

  const signOutHandler = () => {
    dispatch(signOut());
  };

  window.onscroll = () => {
    if (window.scrollY > 0) {
      setBackground("black");
    } else {
      setBackground("transparent");
    }
  };
  return (
    <nav className={`navbar ${background}`}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"></img>
          </Link>

          {
            <ul>
              {HEADER_ITEMS.map((item, i) => (
                <li key={item.title} className={i !== 0 ? "not-first-a" : ""}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              ))}
              <li className="icon" onClick={toggleDropdown}>
                <MenuIcon />
              </li>
            </ul>
          }
        </div>

        <div className="right">
          <Link>
            <SearchIcon />
          </Link>

          <Link
            className="account-dropdown-container"
            onMouseEnter={toggleShowLogOut}
            onMouseLeave={toggleShowLogOut}
          >
            <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"></img>
            <ArrowDropDownIcon />

            {showLogOut && (
              <ul className="account-dropdown-list">
                <li>
                  <button onClick={signOutHandler}>Sign out of Netflix</button>
                </li>
              </ul>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
