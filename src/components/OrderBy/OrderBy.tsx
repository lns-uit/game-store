import React from 'react';
import './styles.css';

interface OrderByPropsType {
  valuesOrderBy: string[];
  valueOrderBy: string;
  onClickOrderByValue: (value) => void;
}

function OrderBy({
  valuesOrderBy,
  valueOrderBy,
  onClickOrderByValue,
}: OrderByPropsType) {
  const renderValuesOrderBy = () => {
    return valuesOrderBy?.map((value, index) => {
      let className = 'order-by-value';
      if (value == valueOrderBy) {
        className += ' active';
      }
      return (
        <button
          onClick={() => onClickOrderByValue(value)}
          className={className}>
          {value}{' '}
        </button>
      );
    });
  };
  return (
    <div className='order-by-container'>
      <div className='order-by-label'>Order by: </div>
      <div className='order-by-wrapper'>{renderValuesOrderBy()}</div>
    </div>
  );
}

export default OrderBy;
