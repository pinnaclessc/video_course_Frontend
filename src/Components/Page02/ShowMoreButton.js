import React, { useState } from 'react';
import classes from "./ShowMoreButton.module.css"

import MoreComponents from './MoreComponents/MoreComponents';

const ShowMoreButton = () => {
  const [showComponent, setShowComponent] = useState(false);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div className={classes["Show-More-FullPage"]}>
      {!showComponent && (
        <button onClick={toggleComponent} className={classes["Show-More-btn"]}>Show More</button>
      )}
      {showComponent && (
        <div>
          <MoreComponents/>
          <button onClick={toggleComponent} className={classes["Show-More-btn"]}>Show Less</button>
        </div>
      )}
    </div>
  );
};
export default ShowMoreButton;

