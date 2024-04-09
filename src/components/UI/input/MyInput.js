import React from 'react';
import styles from './MyInput.module.scss';

const MyInput = React.forwardRef(
  ({ type, placeholder, value, onChange, className }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  }
);

export default MyInput;
