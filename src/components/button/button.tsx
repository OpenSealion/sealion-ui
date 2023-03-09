import React from 'react';
import './button.less';

export interface ButtonProps {
    type?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({ type, children }) => {
    return (
        <button type="button" className="sea-lion-button">{children}</button>
    );
};

export default Button;
