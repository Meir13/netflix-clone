import { useContext, useEffect, useState } from "react";
import "./InfoPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { itemInfoCall } from "../../services/apiCalls";
import { AuthContext } from "../../auth/AuthContext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Title from "../../components/shared/Title";
import { IconsBar } from "../../components/shared/iconsBar/IconsBar";

export const InfoPage = () => {
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { _id } = params;

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }

    const getItemInfo = async () => {
      const itemInfo = await itemInfoCall(_id);
      setItem(itemInfo);
    };

    getItemInfo();
  }, [user]);

  return (
    <>
      {item && (
        <div className="info-page">
          <Title title={item.title + " - Netflix"}></Title>

          <div className="details">
            <div className="img-container">
              <img src={item.imgVertical}></img>
            </div>

            <div className="info">
              <h1>{item.title}</h1>
              <button onClick={() => navigate(`/watch/${item._id}`)}>
                {<PlayArrowIcon />} <span>play</span>
              </button>
              <div className="icons-container">
                <IconsBar item={item} infoPage={true}></IconsBar>
              </div>
              <p>{item.description}</p>
              <p>Type: {item.isSeries ? "Series" : "Movie"}</p>
              <p>Year: {item.year}</p>
              <p>Duration: {item.duration}</p>
              <p>Age restriction: {item.limit}+</p>
              <p>Genre: {item.genre}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
