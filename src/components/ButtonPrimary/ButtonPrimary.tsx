import React from 'react';
import { Button, Radio } from 'antd';
import './styles.css';

interface ButtonPrimaryPropsType {
  text?: string | React.ReactNode;
  callback: () => void;
  outline?: boolean;
  borderColor?: string;
  containerColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  styleClass?: string;
}

function ButtonPrimary({
  text,
  callback,
  outline,
  textColor,
  containerColor,
  borderColor,
  icon,
  styleClass,
}: ButtonPrimaryPropsType) {
  return (
    <Button
      type={outline ? 'default' : 'primary'}
      className={`my-button ${styleClass} ${
        borderColor && 'my-button--outline'
      }`}
      style={{
        backgroundColor: containerColor,
        borderColor: borderColor,
        color: textColor,
      }}
      onClick={callback}
      icon={icon}
    >
      {text}
    </Button>
  );
}

export default ButtonPrimary;
