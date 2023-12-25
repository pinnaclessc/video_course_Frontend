import React, { useState, useEffect } from "react";
import { MdStarRate } from "react-icons/md";
import "./p.css";

export default function Progressbar(props) {
  var filled1 = props.C1;
  var filled2 = props.C2;
  var filled3 = props.C3;
  var filled4 = props.C4;
  var filled5 = props.C5;

  return (
    <>
      <ul className="Progress">
        <li className="list-star">
          <div className="list-star-numb">
          5
            <MdStarRate className="list-star-icon" fontSize="12px" />
          </div>
          <div className="progressbar">
            <div
              className="progress-span"
              style={{
                height: "62%",
                width: `${filled5}%`,
                backgroundColor: "#388e3c",
                marginTop: "2px",
                borderRadius: "10px",
                animation: "progressBar5 0.6s ease-in-out",
                animationFillMode: "both",
                transition: "width 2.8s"
              }}
            ></div>
          </div>
          <div className="progressPercent" style={{}}>
            {filled5}
          </div>
          {}
        </li>
      </ul>
      <ul className="Progress">
        <li className="list-star">
          <div className="list-star-numb">
            4
            <MdStarRate className="list-star-icon" fontSize="12px" />
          </div>
          <div className="progressbar">
            <div
              style={{
                height: "62%",
                width: `${filled4}%`,
                backgroundColor: "#388e3c",
                transition: "width 2.8s",
                marginTop: "2px",
                borderRadius: "10px",
                animation: "progressBar4 0.6s ease-in-out",
                animationFillMode: "both"
              }}
            ></div>
          </div>
          <div className="progressPercent">{filled4}</div>
        </li>
      </ul>

      <ul className="Progress">
        <li className="list-star">
          <div className="list-star-numb">
            3
            <MdStarRate className="list-star-icon" fontSize="12px" />
          </div>
          <div className="progressbar">
            <div
              style={{
                height: "62%",
                width: `${filled3}%`,
                backgroundColor: "#388e3c",
                transition: "width 2.8s",
                marginTop: "2px",
                borderRadius: "10px",
                animation: "progressBar3 0.6s ease-in-out",
                animationFillMode: "both"
              }}
            ></div>
          </div>
          <div className="progressPercent">{filled3}</div>
        </li>
      </ul>
      <ul className="Progress">
        <li className="list-star">
          <div className="list-star-numb">
            2
            <MdStarRate className="list-star-icon" fontSize="12px" />
          </div>
          <div className="progressbar">
            <div
              style={{
                height: "62%",
                width: `${filled2}%`,
                backgroundColor: "#FFAC1C",
                transition: "width 2.8s",
                marginTop: "2px",
                borderRadius: "10px",
                animation: "progressBar2 0.6s ease-in-out",
                animationFillMode: "both"
              }}
            ></div>
          </div>
          <div className="progressPercent">{filled2}</div>
        </li>
      </ul>
      <ul className="Progress">
        <li className="list-star">
          <div className="list-star-numb">
            1
            <MdStarRate className="list-star-icon" fontSize="12px" />
          </div>
          <div className="progressbar">
            <div
              style={{
                height: "62%",
                width: `${filled1}%`,
                backgroundColor: "#FF5F1F",
                transition: "width 2.8s",
                marginTop: "2px",
                borderRadius: "10px",
                animation: "progressBar1 0.6s ease-in-out",
                animationFillMode: "both"
              }}
            ></div>
          </div>
          <div className="progressPercent">{filled1}</div>
        </li>
      </ul>
    </>
  );
}
