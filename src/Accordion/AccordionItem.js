import React, { useState } from 'react';
import {MdOndemandVideo} from 'react-icons/md'


const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={toggleAccordion}>
        {title}
      </div>
      {isOpen && (
        <div className="accordion-content">
          {content.map((item, index) => (
            <div>
            <MdOndemandVideo/><div key={index}>{item}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
