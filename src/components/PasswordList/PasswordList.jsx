import { useState, useEffect } from "react";
import styles from "./PasswordList.module.css";

function PasswordList({ currentPassword }) {
  const [previousPasswords, setPreviousPasswords] = useState([]);

  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];

    setPreviousPasswords(savedPasswords.slice(0, 5)); 

    if (savedPasswords.length >= 5) {
      savedPasswords.pop();
    }

    if (currentPassword) {
      localStorage.setItem("passwords",JSON.stringify([currentPassword, ...savedPasswords]));
    }
  }, [currentPassword]);

  return (
    <div className={styles.PasswordList}>
      <div className={styles.PasswordListHeading}>Eski Passwordlar</div>
      <div className={styles.PreviousPasswordList}>
        {previousPasswords.length === 0 ? (
          <div className={styles.EmptyPreviousPasswordNote}>
            Eski passwordlar listi
          </div>
        ) : (
          <>
            <ul>
              {previousPasswords.map((password, index) => (
                <li key={index}>{password}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default PasswordList;
