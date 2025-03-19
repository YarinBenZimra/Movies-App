import MovieCard from "../../components/MovieCard/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../../services/api";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); // 🔹 Stores filtered movies
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortOption, setSortOption] = useState("default"); // Sorting option

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let data;
        if (searchQuery) {
          data = await searchMovies(searchQuery, currentPage);
        } else {
          data = await getPopularMovies(currentPage);
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
  }, [searchQuery, currentPage]);

  // 🔹 Apply filters & sorting when movies change
  useEffect(() => {
    let updatedMovies = [...movies];

    // Filter by genre if selected
    if (selectedGenre !== "all") {
      updatedMovies = updatedMovies.filter((movie) =>
        movie.genre_ids.includes(Number(selectedGenre))
      );
    }

    // Sort movies
    if (sortOption === "rating") {
      updatedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortOption === "release_date") {
      updatedMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }

    setFilteredMovies(updatedMovies);
  }, [movies, selectedGenre, sortOption]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.home}>
      {/* 🔹 Search Form */}
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

      {/* 🔹 Filter & Sort Options */}
      <div className={styles["filter-sort"]}>
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="rating">Highest Rating</option>
          <option value="release_date">Newest Release</option>
        </select>
      </div>

      {/* 🔹 Error Message */}
      {error && <div className={styles["error-message"]}>{error}</div>}

      {/* 🔹 Movie Display */}
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : filteredMovies.length === 0 ? (
        <div className={styles["no-results"]}>
          <h2>Oops... No movies found!</h2>
          <p>Try searching for something else.</p>
        </div>
      ) : (
        <>
          <div className={styles["movies-grid"]}>
            {filteredMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/${movie.id}`}
                className={styles["movie-link"]}
              >
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>

          {/* 🔹 Pagination Controls */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ◀ Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
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
  );
}

export default Home;
