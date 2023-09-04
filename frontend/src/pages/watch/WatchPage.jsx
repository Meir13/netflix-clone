import ReactPlayer from "react-player";
import "./WatchPage.scss";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { itemInfoCall } from "../../services/apiCalls";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const WatchPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [url, setUrl] = useState(null);
  const params = useParams();
  const { _id } = params;

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }

    const getItemInfo = async () => {
      const itemInfo = await itemInfoCall(_id);
      setUrl(itemInfo.trailer);
    };

    getItemInfo();
  }, []);

  return (
    <div className="watch-page">
      <Link to="javascript:history.go(-1)">
        <ArrowBackIcon fontSize="large" />
      </Link>

      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        height="100%"
        playing={true}
        controls={true}
      ></ReactPlayer>
    </div>
  );
};
