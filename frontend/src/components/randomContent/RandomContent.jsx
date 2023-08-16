import "./RandomContent.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const RandomContent = ({ content }) => {
  return (
    <div className="random-content">
      <img className="random-pic" src={content.img} alt={content.title}></img>

      <div className="info-container">
        <img src={content.imgTitle} alt={content.title}></img>

        <p className="description">{content.description}</p>

        <div className="random-content-buttons">
          <button className="play-button">
            <PlayArrowIcon /> <span>{"  "} Play</span>
          </button>

          <button className="more-info">
            <InfoOutlinedIcon /> <span>{"  "} More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomContent;
