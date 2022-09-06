import styles from "./Search.module.css";
export const Search = () => {
  return (
    <form>
      <div className={styles.searchFormContainer}>
        <input
          type="text"
          className={styles.inputTextContainer}
          placeholder="ingresa la película a buscar"
        ></input>
        <button type="submit" className={styles.submitButton}>
          Search
        </button>
      </div>
    </form>
  );
};
