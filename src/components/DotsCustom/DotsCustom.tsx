import React, { useEffect, useRef } from 'react';
import { DotInfoType } from '../../interfaces/rootInterface';
import DotCustom from '../DotCustom/DotCustom';
import './styles.css';

interface DotsCustomPropsType {
  dotsInfo: DotInfoType[];
  activeIndex: number;
  slideTo: (action: string, value: number | null) => void;
}

function DotsCustom({ dotsInfo, activeIndex, slideTo }: DotsCustomPropsType) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (activeIndex % 4 === 0 && activeIndex > 0) {
      const ox = ref.current.offsetWidth;
      if (dotsInfo.length - activeIndex < 4) {
        ref.current.scrollLeft += ox / (dotsInfo.length - activeIndex);
      } else {
        ref.current.scrollLeft += ox;
      }
    } else if (activeIndex === 0) {
      ref.current.scrollLeft = 0;
    }
  }, [activeIndex]);

  return (
    <div ref={ref} className={`dots`}>
      {dotsInfo.map((dot, index) => {
        return (
          <div
            className={'dot-container'}
            onClick={() => slideTo('slideTo', index)}>
            <DotCustom image={dot.image} active={index === activeIndex} />
          </div>
        );
      })}
    </div>
  );
}

export default DotsCustom;
