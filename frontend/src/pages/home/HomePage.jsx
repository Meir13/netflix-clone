import "./HomePage.scss";
import { useContext, useEffect, useReducer } from "react";
import Title from "../../components/shared/Title";
import NavBar from "../../components/shared/navBar/NavBar";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import RandomContent from "../../components/randomContent/RandomContent";
import { homeReducer, homePageInitialState } from "./homeReducer";
import { contentCall } from "../../services/apiCalls";
import { ContentLists } from "../../components/contentLists/ContentLists";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [{ isLoading, content: lists, error }, dispatch] = useReducer(
    homeReducer,
    homePageInitialState
  );

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    try {
      const getContent = async () => {
        await contentCall(dispatch);
      };

      getContent();
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  return (
    <div className="home">
      <Title title="Home"></Title>

      <NavBar />

      <div>
        {lists[0] && (
          <RandomContent content={lists[0].content[0]}></RandomContent>
        )}
      </div>

      <div>
        {lists.map((list, i) => (
          <ContentLists list={list} key={i}></ContentLists>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
