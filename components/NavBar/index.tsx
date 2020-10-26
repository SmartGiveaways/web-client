import Link from 'next/link';

import styles from './navbar.module.css';

const NavBar = ({}) => {
  return (
    <nav className={styles.navbar}>
      <Link href="/"><a>Logo</a></Link>
      <Link href="/donate"><a>Donate</a></Link>
      <Link href="/support"><a>Support</a></Link>
      <Link href="/docs"><a>Docs</a></Link>
      <Link href="/github"><a>GitHub</a></Link>
      <div className={styles.discover_coming_soon}>
        <Link href="/"><a>Discover</a></Link>
        <span className={styles.soon_badge}>Soon</span>
      </div>
    </nav>
  );
}

export default NavBar;