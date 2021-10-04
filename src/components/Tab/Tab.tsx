import React from 'react';
import './styles.css';

interface TabPropsType {
  text: string;
  active?: boolean;
}

function Tab({ text, active }: TabPropsType) {
  return (
    <div className={`tab ${active && 'tab--active'}`}>
      <p>{text}</p>
    </div>
  );
}

export default Tab;
