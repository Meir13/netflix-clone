import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchPage.scss";
import { filteredContentCall } from "../../services/apiCalls";
import { searchPageInitialState, searchReducer } from "./searchReducer";
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../services/actionTypes";
import Title from "../../components/shared/Title";
import { ListItem } from "../../components/listItem/ListItem";
import { AuthContext } from "../../auth/AuthContext";

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = String(searchParams.get("q"));
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [{ isLoading, error, content }, dispatch] = useReducer(
    searchReducer,
    searchPageInitialState
  );

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    dispatch({ type: GET_REQUEST });

    try {
      const getFilteredContent = async (query) => {
        const filteredContent = await filteredContentCall(query);

        dispatch({ type: GET_SUCCESS, payload: filteredContent });
      };

      getFilteredContent(query);
    } catch (error) {
      dispatch({ type: GET_FAIL, payload: error });
    }
  }, [searchParams]);

  return (
    <div>
      <Title title="Netflix - browse"></Title>
      <div className="search-page">
        <div className="container">
          {content &&
            content.map((item) => (
              <div key={item._id} className="item-container">
                <ListItem item={item}></ListItem>
              </div>
            ))}

          {content.length === 0 && !isLoading && (
            <div className="no-content-found">
              <p>Your search {query} did not have any matches.</p>
              <p>Suggestions</p>
              <ul>
                <li>Try different keywords</li>
                <li>Looking for a movie or TV show?</li>
                <li>Try using a movie, TV show title, an actor or director</li>
                <li>Try a genre, like comedy, romance, sports, or drama</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
