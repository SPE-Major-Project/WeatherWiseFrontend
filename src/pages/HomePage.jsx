import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";

function HomePage() {
  return (
    <div>
      <NavBar />
      <div className="flex items-start justify-center pt-20">
        <SearchBox />
      </div>
    </div>
  );
}

export default HomePage;
