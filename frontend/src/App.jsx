import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/signUp/SignUpPage";
import SignInPage from "./pages/signIn/SignInPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App"></div>

        <main>
          <Routes>
            <Route path="/signin" element={<SignInPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
