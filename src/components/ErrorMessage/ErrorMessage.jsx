import styles from "./ErrorMessage.module.css";
export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className={styles.box} role="alert">
      {message}
    </div>
  );
}
