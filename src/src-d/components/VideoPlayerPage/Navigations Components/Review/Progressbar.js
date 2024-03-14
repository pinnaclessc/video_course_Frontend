import React from "react";
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
          <div className="progressbar">
            
            <div
              className="progress-span"
              style={{
                height: "92%",
                width: `${filled5}%`,
                backgroundColor: "#6a6f73",
                marginTop: "2px",
                animation: "progressBar5 1s ease-in-out",
                animationFillMode: "both",
                transition: "width 2.8s"
              }}
            >
            </div></div>
            <div className="list-star-numb">
          <MdStarRate className="list-star-icon" fontSize="20px" />
          <MdStarRate className="list-star-icon" fontSize="20px" />
          <MdStarRate className="list-star-icon" fontSize="20px" />
          <MdStarRate className="list-star-icon" fontSize="20px" />
          <MdStarRate className="list-star-icon" fontSize="20px" /></div>
          <div className="progressPercent" style={{}}>
            &nbsp;&nbsp;&nbsp;&nbsp;{filled5}
          </div>
          {}
        </li>
      </ul>
      <ul className="Progress">
        <li className="list-star">

          <div className="progressbar">
            <div
              style={{
                height: "92%",
                width: `${filled4}%`,
                backgroundColor: "#6a6f73",
                transition: "width 2.8s",
                marginTop: "2px",
                
                animation: "progressBar4 1s ease-in-out",
                animationFillMode: "both"
              }}
            ></div>
          </div>
          <div className="list-star-numb">
            <MdStarRate className="list-star-icon" fontSize="20px" />
            <MdStarRate className="list-star-icon" fontSize="20px" />
            <MdStarRate className="list-star-icon" fontSize="20px" />
            <MdStarRate className="list-star-icon" fontSize="20px" /></div>
          <div className="progressPercent">&nbsp;&nbsp;&nbsp;&nbsp;{filled4}</div>
        </li>
      </ul>

      <ul className="Progress">
        <li className="list-star">
         
          <div className="progressbar">
            <div
              style={{
                height: "92%",
                width: `${filled3}%`,
                backgroundColor: "#6a6f73",
                transition: "width 2.8s",
                marginTop: "2px",
                
                animation: "progressBar3 1s ease-in-out",
                animationFillMode: "both"
              }}
            ></div>
          </div>
          <div className="list-star-numb">
            
            <MdStarRate className="list-star-icon" fontSize="20px" />
            <MdStarRate className="list-star-icon" fontSize="20px" />
            <MdStarRate className="list-star-icon" fontSize="20px" /></div>
          <div className="progressPercent">&nbsp;&nbsp;&nbsp;&nbsp;{filled3}</div>
        </li>
      </ul>
      <ul className="Progress">
        <li className="list-star">
          
          <div className="progressbar">
            <div
              style={{
                height: "92%",
                width: `${filled2}%`,
                backgroundColor: "#6a6f73",
                transition: "width 2.8s",
                marginTop: "2px",
                animation: "progressBar2 1s ease-in-out",
                animationFillMode: "both"
              }}
            ></div>
          </div>
          <div className="list-star-numb">
            <MdStarRate className="list-star-icon" fontSize="20px" />
            <MdStarRate className="list-star-icon" fontSize="20px" /></div>
          <div className="progressPercent">&nbsp;&nbsp;&nbsp;&nbsp;{filled2}</div>
        </li>
      </ul>
      <ul className="Progress">
        <li className="list-star">
         
          <div className="progressbar">
            <div
              style={{
                height: "92%",
                width: `${filled1}%`,
                backgroundColor: "#6a6f73",
                transition: "width 2.8s",
                marginTop: "2px",
                animation: "progressBar1 1s ease-in-out",
                animationFillMode: "both"
              }}
            ></div>
          </div>
          <div className="list-star-numb">
            <MdStarRate className="list-star-icon" fontSize="20px" /></div>
          <div className="progressPercent">&nbsp;&nbsp;&nbsp;&nbsp;{filled1}</div>
        </li>
      </ul>
    </>
  );
}
