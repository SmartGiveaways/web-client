import Head from "next/head";

import NavBar from "../components/NavBar";
import ChatDemo from "../components/ChatDemo";

import styles from "../styles/index.module.css";

const Index = () => {
  return (
    <>
      <Head>
        <title>Smart Giveaways</title>
          <link rel="icon" sizes="64x64" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="196x196" href="/icon-192.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="/icon-64.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icon-16.png" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;800&display=swap" rel="stylesheet" />
      </Head>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.left_container}>
          <div className={styles.title}>
            <span>Smart</span>
            <span>Giveaways</span>
          </div>
          <p>Take back control of your giveaways and reward those who truly deserve it.</p>
          <div className={styles.get_started}>Get Started</div>
        </div>
        <div className={styles.right_container}>
          <ChatDemo />
        </div>
      </div>
    </>
  );
};

export default Index;
