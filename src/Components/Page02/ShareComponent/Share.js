import React, { useState, useEffect } from "react";
import styles from "./Share.module.css";
import { RxCross1 } from "react-icons/rx";

import { SiGooglemessages } from "react-icons/si";
import { BsTelegram, BsWhatsapp, BsFacebook } from "react-icons/bs";
const url = window.location.href;
const Share = () => {

  const [inputValue, setInputValue] = useState(url);
  const [copytext, setCopytext] = useState("");
  const [isShowCopy, setIsShowCopy] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue);
    setCopytext(`Copied!`);
    setIsShowCopy(true);
    setTimeout(() => {
      setIsShowCopy(false);
    }, 1000);
  };

  const handleShareMessage = () => {
    // Code to share on Message
    console.log("Sharing on Message:", inputValue);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleHide = () => {
    setIsVisible(false);
  };
  useEffect(() => {
    const isComponentVisible = localStorage.getItem("componentVisible");
    if (isComponentVisible !== null) {
      setIsVisible(JSON.parse(isComponentVisible));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("componentVisible", JSON.stringify(isVisible));
  }, [isVisible]);
  if (!isVisible) {
    return null;
  }
  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles["heading-cancleBtn-div"]}>
            <div className={styles.heading}>Share This Course</div>
            <button className={styles["Cross-btn"]} onClick={handleHide}>
              <RxCross1 />
            </button>
          </div>
          <div className={styles["input-copy-container"]}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles['share-input']}
            />
            <button onClick={handleCopy} className={styles.copyButton}>
              Copy
            </button>
            <div className={styles.showcopyButton}>
              {isShowCopy ? <div> &nbsp;&#10003; {copytext}</div> : null}
            </div>
          </div>
          <div className={styles.shareButtons}>
            <button onClick={handleShareMessage} className={styles.shareButton}>
              <SiGooglemessages />
            </button>
            <a
              href={`https://t.me/share?url=${inputValue}`}
              target="blank"
              className={styles.shareButton}
            >
              <BsTelegram />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${inputValue}`}
              target="blank"
              className={styles.shareButton}
            >
              <BsWhatsapp />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${inputValue}`}
              target="blank"
              className={styles.shareButton}
            >
              <BsFacebook />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
