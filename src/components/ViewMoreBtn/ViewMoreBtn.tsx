import React from 'react';
import './styles.css';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import { rootColor } from '../../constants/rootColor';
import { useHistory } from 'react-router-dom';

interface TypeViewMore{
  title: string;
}

function ViewMoreBtn({title}:TypeViewMore) {
  const history = useHistory();
  return (
    <ButtonPrimary
      text='View More'
      callback={() => history.push("/suggestion/"+ title)}
      containerColor='#4c4c4c'
      borderColor='#4c4c4c'
      styleClass='view-more-btn'
    />
  );
}

export default ViewMoreBtn;
