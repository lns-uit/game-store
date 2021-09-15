import React from 'react';
import { Input } from 'antd';
import './styles.css';

interface InputPrimaryPropsType {
  text: string;
  setText: (st: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  stylesClassname?: string;
  rightElement?: React.ReactNode;
}

function InputPrimary({
  text,
  setText,
  icon,
  rightElement,
  placeholder,
  stylesClassname,
}: InputPrimaryPropsType) {
  return (
    <Input
      className={`${stylesClassname}`}
      size='large'
      placeholder={placeholder}
      prefix={icon}
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}

export default InputPrimary;
