import React from 'react';
import './styles.css';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import { rootColor } from '../../constants/rootColor';

function ViewMoreBtn() {
  return (
    <ButtonPrimary
      text='View More'
      callback={() => console.log('Navigate to browse')}
      containerColor={rootColor.lightGrayColor}
      borderColor={rootColor.lightGrayColor}
      //   styleClass='view-more-btn'
    />
  );
}

export default ViewMoreBtn;
