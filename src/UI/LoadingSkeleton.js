import React from 'react';
import classes from './LoadingSkeleton.module.css'; 

const LoadingSkeleton = () => (
  <div className={classes.skeletonContainer}>
    <div className={classes.imageContainer}>
      <div className={classes.skeletonImage}></div>
      <div className={classes.skeletonImage}></div>
    </div>
    <div className={classes.textSkeleton}></div>
    <div className={classes.textSkeleton}></div>
    <div className={classes.progressSkeleton}></div>
    <div className={classes.starContainer}>
      {[...Array(5)].map((_, index) => (
        <div key={index} className={classes.skeletonStar}></div>
      ))}
    </div>
    <div className={classes.ratingTextSkeleton}></div>
  </div>
);

export default LoadingSkeleton;

