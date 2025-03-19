import MovieCard from "../../components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../../services/api";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Loading from "../../components/Loading/Loading";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 Tracks active search term
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery, currentPage); // 🔹 Fetch search results
        } else {
          data = await getPopularMovies(currentPage); // 🔹 Fetch popular movies
        }
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, currentPage]); // 🔹 Runs when searchQuery or page changes

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSearchQuery(searchInput); // 🔹 Store the search query
    setCurrentPage(1); // 🔹 Reset to Page 1 when searching
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <>
      {loading && <Loading />}

      <div
        className={styles.home}
        style={{
          opacity: loading ? 0.5 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <form onSubmit={handleSearch} className={styles["search-form"]}>
          <input
            type="text"
            placeholder="Search for movies..."
            className={styles["search-input"]}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className={styles["search-button"]}
            disabled={!searchInput.trim() || loading}
          >
            Search
          </button>
        </form>

        {error && <div className={styles["error-message"]}>{error}</div>}

        {movies.length === 0 ? ( // 🔹 Show "No Results" message when empty
          <div className={styles["no-results"]}>
            <h2>Oops... No movies found!</h2>
            <p>Try searching for something else.</p>
          </div>
        ) : (
          <>
            <div className={styles["movies-grid"]}>
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/${movie.id}`}
                  className={styles["movie-link"]}
                >
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </div>

            {/* 1. Object.values(movies).map((movie, index) => (
                <MovieCard movie={movie} key={movie.id || index} />
            )); */}

            {/* 2. Object.entries(movies).map(([key, movie]) => (
                <MovieCard movie={movie} key={key} />
            )); */}

            {/* Pagination Controls (Only show if movies exist) */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ◀ Prev
                </button>
                <p>
                  Page <span>{currentPage}</span> of {totalPages}
                </p>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next ▶
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
