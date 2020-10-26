import Head from 'next/head'

import NavBar from '../components/NavBar';
import ChatDemo from '../components/ChatDemo';

import styles from '../styles/index.module.css';

const Index = () => {
  return (
    <>
      <Head>
        <title>Smart Giveaways</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.left_container}>
          <div className={styles.title}>
            <span>Smart</span>
            <span>Giveaways</span>
          </div>
          <p>Thinking...</p>
          <div className={styles.get_started}>Get Started</div>
        </div>
        <div className={styles.right_container}>
          <ChatDemo />
        </div>
      </div>
    </>
  )
}

export default Index;