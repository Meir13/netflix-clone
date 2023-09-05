import "./HomePage.scss";
import { useContext, useEffect, useReducer } from "react";
import Title from "../../components/shared/Title";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import RandomContent from "../../components/randomContent/RandomContent";
import { homeReducer, homePageInitialState } from "./homeReducer";
import { contentCall } from "../../services/apiCalls";
import { ContentList } from "../../components/contentList/ContentList";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../services/actionTypes";
import { LOGOUT, UPDATE_FAVORITES } from "../../auth/authActions";
import { TailSpin } from "react-loader-spinner";

const HomePage = ({ contentType }) => {
  const {
    user,
    dispatch: authDispatch,
    userFavorites,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [{ isLoading, content: lists, error }, dispatch] = useReducer(
    homeReducer,
    homePageInitialState
  );

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }

    dispatch({ type: GET_REQUEST });

    try {
      const getContent = async () => {
        const res = await contentCall(contentType);

        if (res.message) {
          dispatch({ type: GET_FAIL, payload: res.message });

          if (res.message === "Request failed with status code 401") {
            authDispatch({ type: LOGOUT });
            navigate("/signin");
          }
        } else {
          const favorites = res[0];
          authDispatch({ type: UPDATE_FAVORITES, userFavorites: favorites });
          res.shift();
          dispatch({ type: GET_SUCCESS, payload: res });
        }
      };

      getContent();
    } catch (error) {
      console.info(error);
      dispatch({ type: GET_FAIL, payload: error });

      console.error(error);
    }
  }, [user, contentType]);

  let title = "";
  switch (contentType) {
    case "movies":
      title = "Movies";
      break;
    case "series":
      title = "TV Shows";
      break;
    default:
      title = "Home";
  }

  return (
    <div className="home">
      <Title title={title}></Title>

      <RandomContent type={contentType}></RandomContent>

      {userFavorites && userFavorites.content[0] && (
        <ContentList list={userFavorites}></ContentList>
      )}

      {isLoading && (
        <div className="spinner">
          <TailSpin color="red"></TailSpin>
        </div>
      )}

      {!isLoading && (
        <div>
          {lists.map((list, i) => (
            <ContentList list={list} key={i}></ContentList>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
