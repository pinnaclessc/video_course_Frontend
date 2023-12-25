import React from 'react';
import AccordionItem from './AccordionItem';
import accordionData from './accordionData.json';
import './accordion.css';

const Accordion = () => {
  return (
    <div className="accordion-FullPage">
      {accordionData.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;
