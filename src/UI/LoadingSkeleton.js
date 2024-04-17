// LoadingSkeleton.js

import React from 'react';
import styles from './LoadingSkeleton.module.css';

const LoadingSkeleton = () => {
  return (
    <div className={styles.loadingSkeleton}>
      <div className={styles.loader}></div>
      {/* Add placeholders for your content */}
      <div className={styles.placeholder}></div>
      <div className={styles.placeholder}></div>
      <div className={styles.placeholder}></div>
      {/* Add more placeholders as needed */}
    </div>
  );
};

export default LoadingSkeleton;
