import { useContext, useState } from "react";
import "./ListItem.scss";
import ReactPlayer from "react-player";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link, useNavigate } from "react-router-dom";
import { addContentToFavorites } from "../../services/apiCalls";
import { AuthContext } from "../../auth/AuthContext";
import { UPDATE_FAVORITES } from "../../auth/authActions";

export const ListItem = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { userFavorites, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const isFavor = userFavorites.content.some((i) => i._id === item._id);
  const isMobile = window.innerWidth < 480;

  const handelAddToFavorites = async () => {
    try {
      const data = await addContentToFavorites(item._id);
      dispatch({ type: UPDATE_FAVORITES, userFavorites: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to={`/info/${item._id}`}>
        <div
          className={`list-item`}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            className={`contents`}
            onMouseLeave={() => setIsVideoLoaded(false)}
          >
            <Link to={`/info/${item._id}`}>
              <img
                src={!isMobile ? item.imgThumb : item.imgVertical}
                alt={item.img}
              ></img>
            </Link>

            {isHover && !isMobile && (
              <>
                <div className="video-container">
                  {!isVideoLoaded && (
                    <img src={item.imgThumb} className="video-preview"></img>
                  )}

                  <ReactPlayer
                    className="video"
                    width={300}
                    height={145}
                    url={item.trailer}
                    muted={true}
                    playing={true}
                    onReady={() => setIsVideoLoaded(true)}
                  />
                </div>

                <div className="itemInfo">
                  <div className="icons">
                    <div>
                      <PlayArrowIcon
                        className="icon"
                        onClick={() => navigate("/watch/" + item._id)}
                      />

                      {isFavor && (
                        <RemoveIcon
                          className="icon"
                          onClick={() => handelAddToFavorites()}
                        />
                      )}

                      {!isFavor && (
                        <AddIcon
                          className="icon"
                          onClick={() => handelAddToFavorites()}
                        />
                      )}

                      <ThumbUpOutlinedIcon className="icon" />

                      <ThumbDownOutlinedIcon className="icon"></ThumbDownOutlinedIcon>
                    </div>
                    <div>
                      <ExpandMoreIcon
                        className="icon"
                        onClick={() => navigate(`/info/${item._id}`)}
                      />
                    </div>
                  </div>

                  <div className="item-info-top">
                    <span>{item.duration}</span>

                    <span className="limit">+{item.limit}</span>

                    <span>{item.year}</span>
                  </div>

                  <div className="desc">{item.desc}</div>
                  <div className="genre">{item.genre}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};
