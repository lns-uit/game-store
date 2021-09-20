import React from 'react';
import './styles.css';

interface GamesContainerPropsType {
  title: string;
  leftAction?: any;
  children: React.ReactChild;
  gutterHorizontal?: number;
  gutterVertical?: number;
  backgroundColor?: string;
}

function GamesContainer({
  title,
  leftAction,
  children,
  gutterHorizontal,
  gutterVertical,
  backgroundColor,
}: GamesContainerPropsType) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        paddingLeft: gutterHorizontal,
        paddingTop: gutterVertical,
        paddingBottom: gutterVertical,
        paddingRight: gutterHorizontal,
      }}
      className='games-container'>
      <div className='games-container__header'>
        <div className='games-container__header__title'>
          <p>{title}</p>
        </div>
        <div className='games-container__header__left-action'>
          {/* example: View More btn, left, right btn */}
          <p>left action</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default GamesContainer;
