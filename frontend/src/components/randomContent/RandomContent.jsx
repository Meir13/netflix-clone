import "./RandomContent.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const RandomContent = ({ type }) => {
  const [content, setContent] = useState({});
  const navigate = useNavigate();
  const width = window.innerWidth;
  const image = width > 915 ? content.img : content.imgVertical;

  useEffect(() => {
    const getRandomContent = async () => {
      const token = JSON.parse(localStorage.getItem("user")).token;

      const res = await axios.get(
        `/content/random${type ? `?type=${type}` : ""}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setContent(res.data);
    };

    getRandomContent();

    const interval = setInterval(() => {
      getRandomContent();
    }, 4000);

    return () => clearInterval(interval);
  }, [type]);

  return (
    <div className="random-content">
      <div className="spinner">
        {!content.title && <TailSpin color="red"></TailSpin>}
      </div>

      {content.title && (
        <>
          <img className="random-pic" src={image} alt={content.title}></img>

          <div className="info-container">
            {width > 918 && (
              <img src={content.imgTitle} alt={content.title}></img>
            )}

            <p className="description">{content.description}</p>
          </div>

          <div className="random-content-buttons">
            <button
              className="play-button"
              onClick={() => navigate("/watch/" + content._id)}
            >
              <PlayArrowIcon /> <span>{"  "} Play</span>
            </button>

            <button
              className="more-info"
              onClick={() => navigate(`/info/${content._id}`)}
            >
              <InfoOutlinedIcon /> <span>{"  "} More Info</span>
            </button>
          </div>

          <div className="maturity-rating-container">
            <span className="maturity-rating">{content.limit}+</span>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomContent;
