import { useNavigate, Link } from "react-router-dom";
import CurrentDate from "./Date";

function NavBar({ isLogin, setIsLogIn }) {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-white border-green-200 dark:bg-green-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            {/* <img src="add Image url" className="h-8" alt="Logo Image" /> */}
            <div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Weather App
            </div>
          </Link>
          <div>
            <CurrentDate />
          </div>
          {!isLogin && (
            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}
          {isLogin && (
            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => {
                  localStorage.clear();
                  setIsLogIn(false);
                  navigate("/");
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
