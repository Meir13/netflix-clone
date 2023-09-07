import { useState } from "react";
import "./ListItem.scss";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { IconsBar } from "../shared/iconsBar/IconsBar";

export const ListItem = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // const navigate = useNavigate();
  const isMobile = window.innerWidth < 480;

  return (
    <>
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
                <IconsBar item={item}></IconsBar>

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
  );
};
