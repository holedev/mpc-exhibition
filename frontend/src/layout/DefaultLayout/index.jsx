import { useNavigate, useLocation } from "react-router-dom";
import styles from "./DefaultLayout.module.css";

function DefaultLayout({ children }) {

    return <div className={styles.wrapper}>{children}</div>;
}

export default DefaultLayout;
