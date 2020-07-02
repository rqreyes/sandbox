import React, { ReactNode } from 'react';

interface iButtonProps {
  children?: ReactNode;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<iButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
