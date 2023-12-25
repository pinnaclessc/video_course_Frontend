import React, { useState } from "react";
import Styles from "./ReportAbouse.module.css";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function ReportAbouse() {
  const navigate = useNavigate();
  const [issueType, setIssueType] = useState("Choose an abuse type");
  const [issueDetails, setIssueDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Issue Type:", issueType);
    console.log("Issue Details:", issueDetails);
  };
  const CancleHandler=()=>{
    setIssueType("")
    setIssueDetails("")
}

  return (
    <div className={Styles["ReportAbouse-FullPage"]}>
      <div className={Styles["ReportAbouse-Heading"]}>
        <div className={Styles[""]}> Submit an Abuse Report </div>
        <div className={Styles["ReportAbouse-cross"]}>
        <Link to='/page02'><RxCross2 /></Link>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label className={Styles["reportAbouse-label"]}>Issue Type</label>
        <div className={Styles["ReportAbouse-SelectOption"]}>
          <select
            className={Styles["SelectOption"]}
            value={issueType}
            onChange={(e)=> setIssueType(e.target.value)}
          >
          <option>select an issue</option>
          <option>Inappropriate Course Content</option>
          <option>Inappropriate Behavior</option>
          <option>Pinnacle Policy violation</option>
          <option>Spammy Content</option>
          <option>Other</option>
          </select>
        </div>
        <div className={Styles["ReportAbouse-"]}>
          <label className={Styles["reportAbouse-label"]}>Issue Details</label>
          <div className={Styles["textarea-div"]}>
            <textarea
              className={Styles["reportAbouse-textArea"]}
              value={issueDetails}
              onChange={(e) => setIssueDetails(e.target.value)}
            />
          </div>
        </div>
        <div className={Styles["button-div"]}>
          <button className={Styles["cancle-btn"]} onClick={CancleHandler}>Cancel</button>
          <button type="submit" className={Styles["summit-btn"]}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

