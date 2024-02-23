import React from 'react';
import katex from 'katex';

const applyInlineStyle = (text, inlineStyle) => {
  switch (inlineStyle) {
    case 'BOLD':
      return <strong>{text}</strong>;
    case 'ITALIC':
      return <em>{text}</em>;
    case 'UNDERLINE':
      return <u>{text}</u>;
    case 'STRIKETHROUGH':
      return <del>{text}</del>;
    case 'MONOSPACE':
      return <code>{text}</code>;
    case 'BULLET':
      return <li>{text}</li>;
    case 'FONT_SIZE_12':
      return <span style={{ fontSize: '12px' }}>{text}</span>;
    case 'FONT_SIZE_16':
      return <span style={{ fontSize: '16px' }}>{text}</span>;
    case 'FONT_SIZE_20':
      return <span style={{ fontSize: '20px' }}>{text}</span>;
    case 'FONT_FAMILY_SERIF':
      return <span style={{ fontFamily: 'serif' }}>{text}</span>;
    case 'FONT_FAMILY_SANS_SERIF':
      return <span style={{ fontFamily: 'sans-serif' }}>{text}</span>;
    default:
      return text;
  }
};

const applyBlockType = (text, blockType) => {
  switch (blockType) {
    case 'Normal':
      return <p>{text}</p>;
    case 'H1':
      return <h1>{text}</h1>;
    case 'H2':
      return <h2>{text}</h2>;
    case 'H3':
      return <h3>{text}</h3>;
    case 'H4':
      return <h4>{text}</h4>;
    case 'H5':
      return <h5>{text}</h5>;
    case 'H6':
      return <h6>{text}</h6>;
    case 'Blockquote':
      return <blockquote>{text}</blockquote>;
    case 'Code':
      return <code>{text}</code>;
    default:
      return text;
  }
};

const applyListStyle = (text, listType) => {
    const listItems = text.split('\n').map((item, index) => (
      <li key={index}>{item}</li>
    ));
  
    return listType === 'unordered' ? <ul>{listItems}</ul> : <ol>{listItems}</ol>;
  };
  

const applyTextAlign = (text, alignment) => {
  return <div style={{ textAlign: alignment }}>{text}</div>;
};

const applyColor = (text, color) => {
  return <span style={{ color }}>{text}</span>;
};

const applyLink = (text, linkType) => {
  return linkType === 'link' ? <a href="#">{text}</a> : text;
};

const applyMathEquation = (text) => {
  try {
    // Use KaTeX to render math equations
    return <span dangerouslySetInnerHTML={{ __html: katex.renderToString(text, { displayMode: true }) }} />;
  } catch (error) {
    console.error('Error rendering math equation:', error);
    return text;
  }
};

const convertToReactComponents = (blocks) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const result = blocks.map((block) => {
    const { key, text, type, inlineStyleRanges } = block;

    let styledText = text;

    if (inlineStyleRanges && inlineStyleRanges.length > 0) {
      inlineStyleRanges.forEach((range) => {
        switch (range.style) {
          case 'BOLD':
          case 'ITALIC':
          case 'UNDERLINE':
          case 'STRIKETHROUGH':
          case 'MONOSPACE':
          case 'BULLET':
          case 'FONT_SIZE_12':
          case 'FONT_SIZE_16':
          case 'FONT_SIZE_20':
          case 'FONT_FAMILY_SERIF':
          case 'FONT_FAMILY_SANS_SERIF':
            styledText = applyInlineStyle(styledText, range.style);
            break;
          case 'MATH_EQUATION':
            styledText = applyMathEquation(styledText);
            break;
          default:
            console.warn(`Unsupported inline style: ${range.style}`);
            break;
        }
      });
    }

    // Handle different block types
    switch (type) {
        case 'unstyled':
            return <p key={key}>{styledText}</p>;
          case 'ordered-list-item':
            return <ol key={key}><li>{styledText}</li></ol>;
          case 'unordered-list-item':
            return applyListStyle(styledText, type.split('-')[0]);
          default:
            return applyBlockType(styledText, type);
    }
  });

  return result.flat();
};

const HTMLRenderer = ({ htmlContent }) => {
  const content = JSON.parse(htmlContent);

  return <div>{convertToReactComponents(content.blocks)}</div>;
};

export default HTMLRenderer;