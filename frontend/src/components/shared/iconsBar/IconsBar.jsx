import "./IconsBar.scss";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { addContentToFavorites } from "../../../services/apiCalls";
import { UPDATE_FAVORITES } from "../../../auth/authActions";

export const IconsBar = ({ item, infoPage }) => {
  const navigate = useNavigate();
  const { userFavorites, dispatch } = useContext(AuthContext);

  const isFavor = userFavorites.content.some((i) => i._id === item._id);

  const handelAddToFavorites = async () => {
    try {
      const data = await addContentToFavorites(item._id);
      dispatch({ type: UPDATE_FAVORITES, userFavorites: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="icons">
      <div>
        {!infoPage && (
          <PlayArrowIcon
            className="icon"
            onClick={() => navigate("/watch/" + item._id)}
          />
        )}

        {isFavor && (
          <RemoveIcon className="icon" onClick={() => handelAddToFavorites()} />
        )}

        {!isFavor && (
          <AddIcon className="icon" onClick={() => handelAddToFavorites()} />
        )}

        <ThumbUpOutlinedIcon className="icon" />

        <ThumbDownOutlinedIcon className="icon"></ThumbDownOutlinedIcon>
      </div>
      {!infoPage && (
        <div>
          <ExpandMoreIcon
            className="icon"
            onClick={() => navigate(`/info/${item._id}`)}
          />
        </div>
      )}
    </div>
  );
};
