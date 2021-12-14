import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './styles.css';
import { rootColor } from '../../constants/rootColor';

function SpinLoading() {
  return (
    <div className='loading-container'>
      <Spin
        indicator={
          <LoadingOutlined
            style={{ fontSize: 30, color: rootColor.redColor }}
            spin
          />
        }
      />
    </div>
  );
}

export default SpinLoading;
