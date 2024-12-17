import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

    <Outlet />

      <Footer />
    </div>
  );
};

export default Sidebar;
