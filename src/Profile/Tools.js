import React from "react";
import Styles from "./Tools.module.css";
import Footer from "../Components/HomePage01/Footer/Footer";
import { MdOndemandVideo,MdAutoGraph,MdOutlineDiscount} from "react-icons/md";
export default function Tools() {
  return (
    <div className={Styles["Tools-fullPage"]}>
      <div className={Styles["heading"]}>Tools</div>
      <div className={Styles["Main-Body"]}>
        <div className={Styles["Body-part-01"]}>
            <MdOndemandVideo size={40}/>
            <h4>Test Video</h4>
            <p className={Styles["tools-Para"]}>
            Get free feedback from Pinnacle video experts on your audio, video, and delivery.
            </p>

        </div>
        <div className={Styles["Body-part-01"]}>
            <MdAutoGraph size={40}/>
            <h4>Market Insights</h4>
            <p className={Styles["tools-Para"]}>Get Pinnacle-wide market data to create successful courses.</p>

        </div>
        <div className={Styles["Body-part-01"]}>
            <MdOutlineDiscount size={40}/>
            <h4>Bulk Coupon creation</h4>
            <p className={Styles["tools-Para"]}>Create multiple coupons at once via CSV upload.</p>

        </div>
      </div>
    </div>
  );
}
