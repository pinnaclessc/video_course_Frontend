// import React, { useState } from 'react';
// import {MdOndemandVideo} from 'react-icons/md'


// const AccordionItem = ({ title, content }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="accordion-item">
//       <div className="accordion-title" onClick={toggleAccordion}>
//         {title}
//       </div>
//       {isOpen && (
//         <div className="accordion-content">
//           {content.map((item, index) => (
//             <div>
//             <MdOndemandVideo/><div key={index}>{item}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AccordionItem;

import React, { useState } from 'react';
import { MdOndemandVideo } from 'react-icons/md';

const AccordionItem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={toggleAccordion}>
        {data.chapterTitle}
      </div>
      {isOpen && (
        <div className="accordion-content">
          {data.days.map((day, index) => (
            <div key={index}>
              <strong>Day {day.dayNumber}:</strong>
              {day.topics.map((topic, topicIndex) => (
                <div key={topicIndex}>
                  <MdOndemandVideo />
                  <div>{topic.title}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;

