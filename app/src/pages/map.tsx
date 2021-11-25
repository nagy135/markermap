import { useAuth } from "context/log";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Map: NextPage = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>MAP</h1>
        <h2>User: {user ? "login" : "logout"}</h2>
      </main>
    </div>
  );
};

export default Map;
