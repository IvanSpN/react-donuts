import React, { InputHTMLAttributes } from 'react';

import styles from './MyInput.module.scss';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const MyInput = React.forwardRef<HTMLInputElement, MyInputProps>(
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
