import React from "react";
import classes from "./ContentDetails.module.css";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { MdOndemandVideo } from "react-icons/md";
import{BiMobile} from 'react-icons/bi'
import {BsFileEarmarkPdf} from "react-icons/bs"
import {MdOutlineClosedCaptionOff } from "react-icons/md";


export default function ContentDetails() {
  return (
    <div className={classes["ContentDetails-fullpage"]}>
      <div className={classes["ContentDetails-heading"]}>
        What you will learn
      </div>
      <div className={classes["What-learn-div"]}>
        <div>
          <div>
            <VscDebugBreakpointData />
            Video solution of the book
          </div>
          <div>
            
            <VscDebugBreakpointData />
            Class notes (PDF) of each video
          </div>
          <div>
         
            <VscDebugBreakpointData />
            Chapter wise arranged videos
          </div>
          <div>
            <VscDebugBreakpointData />
            Day wise schedule and videos accordingly
          </div>
        </div>
        <div>
          <div>
            <VscDebugBreakpointData />
            Exam oriented videos by expert faculty
          </div>
          <div>
            <VscDebugBreakpointData />
            Concepts clarity : basic to advance Concepts, varieties questions,
            practice questions videos
          </div>
        </div>
      </div>
      <div className={classes["ContentDetails-heading"]}>This course includes:</div>
      <div className={classes["includes-div"]}>
        <div>
          <div> <MdOndemandVideo />150 Hours on-demand videos</div>
          <div> <BiMobile/>Access on mobile, laptop and TV</div>
        </div>
        <div>
          <div><BsFileEarmarkPdf/>150 Class notes (PDF)</div>
          <div> <MdOutlineClosedCaptionOff/>captions in regional languages</div>
        </div>
      </div>
    </div>
  );
}
