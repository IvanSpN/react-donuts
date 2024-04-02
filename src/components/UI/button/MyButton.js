import React from 'react';
import styles from './MyButton.module.scss';

const MyButton = ({ children, type, disabled, onClick, className }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default MyButton;
