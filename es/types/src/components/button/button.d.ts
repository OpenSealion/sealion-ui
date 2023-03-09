import React from 'react';
import './button.less';
export interface ButtonProps {
    type?: 'primary' | 'secondary';
}
declare const Button: React.FC<ButtonProps>;
export default Button;
