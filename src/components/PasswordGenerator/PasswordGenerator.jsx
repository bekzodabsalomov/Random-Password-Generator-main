import { useState } from "react";
import styles from "./PasswordGenerator.module.css";
import secureRandomPassword from "secure-random-password";
import clipboardCopy from "clipboard-copy";
import PasswordList from "../PasswordList/PasswordList";

function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [copiedMessage, setCopiedMessage] = useState("");
  const generateNewPassword = () => {
    const config = [
      ...(includeNumbers ? [secureRandomPassword.digits] : []),
      ...(includeAlphabets
        ? [secureRandomPassword.upper, secureRandomPassword.lower]
        : []),
      ...(includeSpecialChars ? [secureRandomPassword.symbols] : []),
    ];

    const options = {
      characters: config,
    };

    const newPassword = secureRandomPassword.randomPassword(options); 
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    clipboardCopy(password); 
    setCopiedMessage("Password copied to clipboard!");
    setTimeout(() => setCopiedMessage(""), 1000);
  };

  return (
    <div className={styles.PasswordGeneratorContainer}>
      <div className={styles.PasswordGenerator}>
        <div className={styles.PasswordGenerateHeading}>
          Random Password Generate
        </div>
        <div className={styles.PasswordDisplay}>
          <input
            type="text"
            value={password}
            disabled
            className={styles.PasswordContainer}
            style={password ? { opacity: "1" } : { opacity: "0.6" }}
          />

          <button onClick={copyToClipboard} disabled={!password}>
            Copy
          </button>

          {copiedMessage ? (
            <div className={styles.CopiedMessage}>{copiedMessage}</div>
          ) : (
            <div className={styles.CopiedMessageEmpty}></div>
          )}
        </div>
        <div className={styles.Options}>
          <div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                />
                <span className={styles.OptionText}>Raqam Qoshish</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeAlphabets}
                  onChange={() => setIncludeAlphabets(!includeAlphabets)}
                />
                <span className={styles.OptionText}>Harflar qoshish</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={includeSpecialChars}
                  onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
                />
                <span className={styles.OptionText}>
                  Simbol qoshish
                </span>
              </label>
            </div>
          </div>
        </div>
        {!includeAlphabets && !includeNumbers && !includeSpecialChars && (
          <div className={styles.EmptySelectionNote}>
          Random Password Generate qlish uchun brorta checkbox ni tanlang
          </div>
        )}
        <button
          onClick={generateNewPassword}
          disabled={
            !includeAlphabets && !includeNumbers && !includeSpecialChars
          }
        >
          Passwordni Generate qlish
        </button>
        <div>
          <PasswordList currentPassword={password} />
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
