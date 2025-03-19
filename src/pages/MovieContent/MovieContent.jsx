import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieContent.module.css";
import { getMovieDetails } from "../../services/api";
import Loading from "../../components/Loading/Loading";

function MovieContent() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieContent = async () => {
      try {
        const selectedMovie = await getMovieDetails(movieId);
        setMovie(selectedMovie);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    loadMovieContent();
  }, [movieId]);

  if (loading) return <Loading />;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles["movie-container"]}>
      <h1 className={styles.title}>{movie.title}</h1>
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p className={styles.description}>{movie.overview}</p>
      <p className={styles.rating}>⭐ {Math.floor(movie.vote_average)} / 10</p>
      <p className={styles.release}>Release Date: {movie.release_date}</p>
    </div>
  );
}

export default MovieContent;
