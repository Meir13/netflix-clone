import { useState } from "react";
import "./ListItem.scss";
import ReactPlayer from "react-player";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const ListItem = ({ item }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="list-item"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img src={item.imgThumb} alt={item.img}></img>

      <div className="player-container">
        {/* {isHover && <div className="player"></div>} */}

        {/* {isHover && (
          <>
            <ReactPlayer
              className="player"
              width={300}
              height={175}
              url={item.trailer}
              // light={item.imgThumb}
              playing={false}
            />

            <div className="content-buttons">
              <div>
                <PlayArrowIcon className="like" />

                <AddIcon className="like" />

                <ThumbUpOutlinedIcon className="like" />

                <ThumbDownAltIcon className="like" />
              </div>

              <ExpandMoreIcon className="like" />
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};
