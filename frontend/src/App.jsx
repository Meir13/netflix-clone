import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signIn/SignInPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App"></div>

        <main>
          <Routes>
            <Route path="/signin" element={<SignInPage />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
