import { useState } from "react";
import "./ListItem.scss";
import ReactPlayer from "react-player";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";

export const ListItem = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div
        className="list-item"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="contents">
          <img src={item.imgThumb} alt={item.img}></img>

          {isHover && (
            <>
              <ReactPlayer
                className="video"
                width={300}
                height={145}
                url={item.trailer}
                playing={false}
                style={{ color: "transparent" }}
              />

              <div className="itemInfo">
                <div className="icons">
                  <div>
                    <PlayArrowIcon className="icon" />

                    <AddIcon className="icon" />

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
    </>

    //my
    // <div
    //   className="list-item"
    //   onMouseEnter={() => setIsHover(true)}
    //   onMouseLeave={() => setIsHover(false)}
    // >
    //   <img src={item.imgThumb} alt={item.img}></img>

    //   <div className="player-container">
    //     {isHover && (
    //       <>
    //         <ReactPlayer
    //           className="player"
    //           width={300}
    //           height={175}
    //           url={item.trailer}
    //           // light={item.imgThumb}
    //           playing={false}
    //         />

    //         <div className="content-buttons">
    //           <div>
    //             <PlayArrowIcon className="like" />

    //             <AddIcon className="like" />

    //             <ThumbUpOutlinedIcon className="like" />

    //             <ThumbDownAltIcon className="like" />
    //           </div>

    //           <ExpandMoreIcon className="like" />
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
};
