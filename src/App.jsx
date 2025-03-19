import MovieContent from "./pages/MovieContent/MovieContent";
import Home from "./pages/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <NavBar />
      <div className={styles["main-content"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:movieId" element={<MovieContent />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
