import React from 'react';
import styles from './MyInput.module.scss';

const MyInput = ({ type, placeholder, value, onChange, className }) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default MyInput;
