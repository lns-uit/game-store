import React from 'react';
import { DotInfoType } from '../../interfaces/rootInterface';
import DotCustom from '../DotCustom/DotCustom';
import './styles.css';

interface DotsCustomPropsType {
  dotsInfo: DotInfoType[];
  activeIndex: number;
  isHorizontal?: boolean;
}

function DotsCustom({
  isHorizontal,
  dotsInfo,
  activeIndex,
}: DotsCustomPropsType) {
  return (
    <div className={`dots ${isHorizontal && 'dots--horizontal'}`}>
      {dotsInfo.map((dot, index) => {
        let classname = `dot-container`;
        if (index === 0) classname += ' dot-container--first';
        if (index === dotsInfo.length - 1) classname += ' dot-container--last';
        return (
          <div className={classname}>
            <DotCustom
              image={dot.image}
              name={dot.name}
              active={index === activeIndex}
              isHorizontal={isHorizontal}
            />
          </div>
        );
      })}
    </div>
  );
}

export default DotsCustom;
