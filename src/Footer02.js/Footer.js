import React, { useEffect } from "react";
import styles from "./Footer.module.css";
import { BiGlobe, BiRightArrowAlt } from "react-icons/bi";
import { TfiYoutube } from "react-icons/tfi";
import { BsTelegram } from "react-icons/bs";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumns}>
        <div className={styles.footerColumn}>
          <div
            className={styles.footerRow}
            onClick={() => navigate("/aboutus")}
          >
            <div className={styles["individual-div"]}>About Us</div>
          </div>
          <div
            className={styles.footerRow}
          >
            <div className={styles["individual-div"]}><a href="https://play.google.com/store/search?q=pinnacle&c=apps&hl=en-IN" target="blank" className={styles['aTag']}>Download App</a></div>
          </div>
          <div
            className={styles.footerRow}
            onClick={() => navigate("/contectus")}
          >
            <div className={styles["individual-div"]}>Contact Us</div>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.footerRow}
          onClick={() => navigate("/TearmAndCondition")}>
            <div className={styles["individual-div"]} target="blank">
              Terms &amp; Conditions
            </div>
          </div>
          <div
            className={styles.footerRow}
            onClick={() => navigate("/privacyPolicy")}
          >
            <div className={styles["individual-div"]} >Privacy Policy</div>
          </div>
          <div
            className={styles.footerRow}
            onClick={() => navigate("/refundPolicy")}
          >
            <div className={styles["individual-div"]}>Refund Policy</div>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <div className={styles.footerRow}>
            <div className={styles["individual-div"]}><a href="https://ssccglpinnacle.com/books.php" target="blank" className={styles['aTag']}>Printed Books</a></div>
          </div>
          <div className={styles.footerRow}>
          
            <div className={styles["individual-div"]}><a href="https://ssccglpinnacle.com/ebooks.php" target="blank" className={styles['aTag']}>Digital Books</a></div>
          </div>
          <div className={styles.footerRow}>
            <div className={styles["individual-div"]}><a href="https://testseries.ssccglpinnacle.com/testseries/frontierias@ssccglpinnacle.com" target="blank" className={styles['aTag']}>Test Portal</a></div>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <TfiYoutube className={styles.youtubeicon} size={25} />
          <div className={styles.footerRow}>
            <div className={styles["individual-div"]}><a href="https://www.youtube.com/channel/UCn3aOx3FoeRUzVhOHL5U5Mw" target="blank" className={styles['aTag']}>YouTube Channel</a></div>
          </div>
          <BsTelegram className={styles.telegramicon} size={25} />
          <div className={styles.footerRow}>
            <div className={styles["individual-div"]}><a href="https://t.me/ssccglpinnacleonline" target="blank" className={styles['aTag']}>Telegram Channel</a></div>
          </div>
        </div>
        <div className={styles.footerColumnlast}>
          <BiGlobe className={styles.footerGlobeIcon} size={25} />
          <div className={styles.footerLanguage}>English</div>
        </div>
      </div>

      <div className={styles.footerCopyright}>
        <BiRightArrowAlt className={styles.footerCopyrightIcon} size={14} />
        <span>&copy; 2023 Pinnacle. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
