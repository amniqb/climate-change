import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.shell}>
      <Navbar />
      <main className={`container ${styles.main}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
