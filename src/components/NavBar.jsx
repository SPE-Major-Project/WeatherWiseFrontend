import { useNavigate } from "react-router-dom";
import CurrentDate from "./Date";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-white border-green-200 dark:bg-green-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://www.github.com/rishabh0014"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            target="__blank"
          >
            <img src="add Image url" className="h-8" alt="Logo Image" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Weather App
            </span>
          </a>
          <div>
            <CurrentDate />
          </div>
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
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
