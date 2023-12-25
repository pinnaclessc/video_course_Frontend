import Star from "./Star";
import Progressbar from "./Progressbar";
import React, { useCallback } from "react";
import{IoMdSearch} from "react-icons/io"
import "./styles.css";

const Review = () => {
  const start1 = [1, 2, 3, 5, 6];

  const fn = useCallback((message) => {
    console.log(message);
  }, []);

  return (
    <div className="rfpage">
    <div className="heding">Student feedback</div>
      <Star />
      <div className="reviewHeading">Review</div>
      <div className="filterrationgHeading">Filter Ratings</div>
      <div>
        <input className="filter-search" type="text"/>
       <button className="searchBtn"><IoMdSearch size={20}/></button>
        <select defaultValue="All Ratings" className="rating-filter">
        <option>All Ratings</option>
        <option>Five Stars</option>
        <option>Four Stars</option>
        <option>Three Stars</option>
        <option>Two Stars</option>
        <option>One Stars</option>
        </select></div>
    </div>
  );
};
export default Review;
