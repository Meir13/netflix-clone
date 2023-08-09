import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/signUp/SignUpPage";
import SignInPage from "./pages/signIn/SignInPage";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
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
