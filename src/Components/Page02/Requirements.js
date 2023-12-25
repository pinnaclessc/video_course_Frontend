import React from 'react'

import classes from './Requirements.module.css'

export default function Requirements() {
  return (
    <div className={classes['requirements-full-page']}>
      <ul><p className={classes['requirements-heading']}>Requirements</p>
      <li className={classes['requirements-li']}><p>This course is from basics to advance level, no prior competition exams exposure required.  </p></li>
      <li className={classes['requirements-li']}><p>Good internet connection is required so that you can watch videos smoothly</p></li>
      <li className={classes['requirements-li']}><p>Step by step subject is covered in details. So you will not required any other coaching.</p></li>
      <li className={classes['requirements-li']}><p>Students are advised to purchase Pinnacle SSC maths 6800 TCS MCQ book.  </p></li>

      </ul>
        

      
    </div>
  )
}
