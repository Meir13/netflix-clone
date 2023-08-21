import "./HomePage.scss";
import { useContext, useEffect, useReducer, useState } from "react";
import Title from "../../components/shared/Title";
import NavBar from "../../components/shared/navBar/NavBar";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import RandomContent from "../../components/randomContent/RandomContent";
import { homeReducer, homePageInitialState } from "./homeReducer";
import { contentCall } from "../../services/apiCalls";
import { ContentList } from "../../components/contentList/ContentList";

const HomePage = ({ type }) => {
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
        await contentCall(dispatch, type);
      };

      getContent();
    } catch (error) {
      console.error(error);
    }
  }, [user, navigate]);

  return (
    <div className="home">
      <Title title="Home"></Title>

      <NavBar />

      <RandomContent type={type}></RandomContent>

      <div>
        {lists.map((list, i) => (
          <ContentList list={list} key={i}></ContentList>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
