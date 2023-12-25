import React from "react";
import classes from "./Categories.module.css";

export default function Categories() {
  return (
    <div className={classes.categories_fullPage}>
      <div className={classes.Category}>
        <div className={classes.Category_heaing}>Category</div>
        <div className={classes.Category_content}>
          <div>
          <input type="checkbox"></input> SSC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div>
            <input type="checkbox"></input> Railway&nbsp;
          </div>
          <div>
            <input type="checkbox"></input> Banking&nbsp;
          </div>
          <div>
            <input type="checkbox"></input> Teaching
          </div>
          <div className={classes.showMore_div}>
            <button className={classes.showMore_btn}>Show more</button>
          </div>
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={classes.Category_heaing}>Exam Name</div>
      <div className={classes.Category_content}>
        <div>
          <input type="checkbox"></input> SSC CGL Tier 1&nbsp;
        </div>
        <div>
          <input type="checkbox"></input> SSC CGL Tier 2&nbsp;
        </div>
        <div>
          <input type="checkbox"></input> SSC CHSL Tier 1
        </div>
        <div>
          <input type="checkbox"></input> SSC CHSL Tier 2
        </div>
        <div>
          <input type="checkbox"></input> SSC MTS Tier 1&nbsp;&nbsp;
        </div>
        <div>
          <input type="checkbox"></input> SSC CPO Tier 1&nbsp;&nbsp;
        </div>
        <div>
          <input type="checkbox"></input> SSC CPO Tier 1&nbsp;&nbsp;
        </div>
        <div className={classes.showMore_div}>
          <button className={classes.showMore_btn}>Show more</button>
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={classes.Category_heaing}>Language</div>
      <div className={classes.Category_content}>
        <div>
          <input type="checkbox"></input> Hinglish
        </div>
        <div>
          <input type="checkbox"></input> English&nbsp;&nbsp;
        </div>
        <div>
          <input type="checkbox"></input> Hindi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div className={classes.showMore_div}>
          <button className={classes.showMore_btn}>Show more</button>
        </div>
      </div>
      <div>&nbsp;</div>
      <div className={classes.Category_heaing}> Subject</div>
      <div className={classes.Category_content}>
      <div>
          <input type="checkbox"></input> Maths&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div>
          <input type="checkbox"></input> Reasoning 
        </div>
        <div>
          <input type="checkbox"></input> English&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div>
          <input type="checkbox"></input>GS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
        <div className={classes.showMore_div}>
          <button className={classes.showMore_btn}>Show more</button>
        </div>
        </div>
    </div>
  );
}
