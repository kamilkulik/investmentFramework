import React from "react";
import styles from "./smallBtn.module.scss";

const SmallBtn = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.smallBtn}>
      {children}
    </button>
  );
};

export default SmallBtn;
