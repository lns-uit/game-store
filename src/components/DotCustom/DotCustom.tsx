import React from 'react';
import './styles.css';

interface DotCustomPropsType {
  image: string;
  name?: string;
  active?: boolean;
  isHorizontal?: boolean;
}

function DotCustom({ image, name, active, isHorizontal }: DotCustomPropsType) {
  return (
    <div
      className={`dot ${active && 'dot--active'} ${
        isHorizontal && 'dot--horizontal'
      }`}>
      <div className='dot__image-container'>
        <img src={image} alt='dot-image' />
      </div>
      {!isHorizontal && <div className='dot__name'>{name}</div>}
    </div>
  );
}

export default DotCustom;
