import React from 'react';
import './styles.css';

interface DotCustomPropsType {
  image: string;
  active?: boolean;
}

function DotCustom({ image, active }: DotCustomPropsType) {
  return (
    <div className={`dot ${active && 'dot--active'}`}>
      <div className='dot__image-container'>
        <img src={image} alt='dot-image' />
      </div>
    </div>
  );
}

export default DotCustom;
