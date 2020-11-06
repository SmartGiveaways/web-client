import Link from "next/link";

import styles from "./navbar.module.css";

const NavBar = ({}) => {
  return (
    <nav className={styles.navbar}>
      <Link href="/"><img src="/icon-64.png" alt="logo" /></Link>
      <Link href="/donate"><a>Donate</a></Link>
      <Link href="https://discord.gg/aS4PebKZpe"><a>Support</a></Link>
      <Link href="/docs"><a>Docs</a></Link>
      <Link href="https://github.com/SmartGiveaways"><a>GitHub</a></Link>
      <div className={styles.discover_coming_soon}>
        <Link href="/"><a>Discover</a></Link>
        <span className={styles.soon_badge}>Soon</span>
      </div>
    </nav>
  );
};

export default NavBar;
