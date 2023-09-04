import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/signUp/SignUpPage";
import SignInPage from "./pages/signIn/SignInPage";
import HomePage from "./pages/home/HomePage";
import { Layout } from "./components/layout/Layout";
import { InfoPage } from "./pages/info/InfoPage";
import { WatchPage } from "./pages/watch/WatchPage";
import { SearchPage } from "./pages/search/SearchPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<HomePage />}></Route>
                <Route
                  path="/movies"
                  element={<HomePage contentType={"movies"} />}
                ></Route>
                <Route
                  path="/series"
                  element={<HomePage contentType={"series"} />}
                ></Route>
                <Route path="/info/:_id" element={<InfoPage />}></Route>
                <Route path="/search" element={<SearchPage />}></Route>
              </Route>
              <Route path="/watch/:_id" element={<WatchPage />}></Route>
              <Route path="/signin" element={<SignInPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
