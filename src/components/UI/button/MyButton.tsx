import styles from './MyButton.module.scss';

interface MyButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
}

const MyButton: React.FC<MyButtonProps> = ({
  children,
  type,
  disabled,
  onClick,
  className,
  title,
}) => {
  return (
    <button
      title={title}
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
