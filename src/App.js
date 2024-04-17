import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";

function App() {
  const [isLogin, setIsLogIn] = useState(false);
  return (
    <div>
      <div>
        <BrowserRouter>
          <NavBar isLogin={isLogin} setIsLogIn={setIsLogIn} />
          <Routes>
            <Route path="*" element={<HomePage isLogin={isLogin} />} />
            {!isLogin && (
              <Route
                path="/login"
                element={<LogInPage setIsLogIn={setIsLogIn} />}
              />
            )}
            {!isLogin && <Route path="/signup" element={<SignUpPage />} />}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
