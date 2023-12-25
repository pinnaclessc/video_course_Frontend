import React, { useState, useEffect } from "react";
import moment from "moment";
import classes from "./Timer.module.css";

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [showSemicolon, setShowSemicolon] = useState(true);

  useEffect(() =>{
    setInterval(() => {
      const now = moment();
      const then = moment("2020-10-15 12:12:12", "YYYY-MM-DD hh:mm:ss");
      const countdown = moment(then - now);
      setDays(countdown.format("D"));
      setHours(countdown.format("HH"));
      setMinutes(countdown.format("mm"));
      setSeconds(countdown.format("ss"));
    }, 1000);
  }, []);

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
    <div className={classes["timer-fullpage"]}>
      <div className={classes.cross_button_div}>
        <button className={classes.cross_button} onClick={handleHide}>
          &#x2716;
        </button>
      </div>

      <div className={classes.timer}>
        <div className={classes.timer_content}>
          Congratulations you have special 60% discount offer ! Plus 10% extra
          instant purchase offer
        </div>
        <div className={classes.timer_time}>
          <div> ends in {minutes} minute</div>
          {showSemicolon?<div className="semicolon">:</div>: null}
          <div>{seconds} seconds</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
