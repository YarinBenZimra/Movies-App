import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      navigate(0);
    }
  };

  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar-brand"]}>
        <img className={styles["navbar-logo"]} src={logo} alt="logo" />
        <Link
          className={styles["navbar-title"]}
          to="/"
          onClick={handleHomeClick}
        >
          Movie App
        </Link>
      </div>
      <div className={styles["navbar-links"]}>
        <Link to="/" className={styles["nav-link"]} onClick={handleHomeClick}>
          Home
        </Link>
        {/* <Link to="/favorites" className={styles["nav-link"]}>
          Favorites
        </Link> */}
      </div>
    </nav>
  );
}

export default NavBar;
