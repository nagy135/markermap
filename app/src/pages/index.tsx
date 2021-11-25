import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import Login from "../components/login";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Marker Map</title>
        <meta
          name="description"
          content="Map showing visited peaks of users with photos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to MarkerMap</h1>

        <p className={styles.description}>Place where your records last</p>
        <Login></Login>
      </main>
    </div>
  );
};

export default Home;
