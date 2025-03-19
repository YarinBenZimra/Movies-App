import React from "react";
import styles from "./Loading.module.css";
import loadingIcon from "../../assets/film.png";

function Loading() {
  return (
    <div className={styles.loadingBackground}>
      <img className={styles.icon} src={loadingIcon} alt="Loading..." />
    </div>
  );
}

export default Loading;
