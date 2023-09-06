import "./NavBar.scss";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContext, useEffect, useState } from "react";
import { signOut } from "../../../auth/authActions";
import { AuthContext } from "../../../auth/AuthContext";
import { SearchBar } from "../../searchBar/SearchBar";
import { MobileNavBar } from "./mobileNavBar/MobileNavBar";

const HEADER_ITEMS = [
  { title: "Home", path: "/" },
  { title: "Movies", path: "/movies" },
  { title: "TV Shows", path: "/series" },
];

const NavBar = () => {
  const { dispatch } = useContext(AuthContext);
  const [showLogOut, setShowLogOut] = useState(false);
  const [background, setBackground] = useState("");
  const [isInSearch, setIsInSearch] = useState(false);
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);

  const isMobile = windowDimension <= 915;

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

  useEffect(() => {
    function handelResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  }, []);

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
            </ul>
          }
        </div>

        <div className="right">
          <div onBlur={() => setIsInSearch(false)}>
            {isInSearch && <SearchBar />}
          </div>

          {!isInSearch && (
            <Link onClick={() => setIsInSearch(true)}>
              <SearchIcon className="icon" />
            </Link>
          )}

          {isMobile && (
            <MobileNavBar
              navbarItems={HEADER_ITEMS}
              signOut={signOutHandler}
            ></MobileNavBar>
          )}

          <Link
            className="account-dropdown-container"
            onMouseEnter={toggleShowLogOut}
            onMouseLeave={toggleShowLogOut}
          >
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"></img>
            <ArrowDropDownIcon className="icon" />

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
