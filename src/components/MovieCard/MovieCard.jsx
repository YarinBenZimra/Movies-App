import styles from "./MovieCard.module.css";

function MovieCard({ movie }) {
  return (
    <div className={styles["movie-card"]}>
      <div className={styles["movie-poster"]}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={styles["movie-opacity"]}></div>
      </div>
      <div className={styles["movie-info"]}>
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
