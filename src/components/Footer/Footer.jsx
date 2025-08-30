import styles from "./Footer.module.css";

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>Source: global-warming.org - Built with Recharts</p>
      </div>
    </footer>
  );
}
