import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./MobileNavBar.scss";

export const MobileNavBar = ({ navbarItems }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="in-mobile">
      <div onClick={toggleDropdown}>
        <MenuIcon className="icon" />
      </div>

      {showDropDown && (
        <ul className={`mobile-dropdown ${showDropDown ? "open" : ""}`}>
          <li>
            <div onClick={toggleDropdown}>
              <CloseIcon className="icon" />
            </div>
          </li>
          {navbarItems.map((item) => (
            <li key={item.title}>
              <Link to={item.path} onClick={toggleDropdown}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
