import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './style/index';

export interface IButton {
    className?: string,
    icon?: ReactNode,
    type?: 'default' | 'primary',
    size?: string,
    disabled?: boolean,
    onMouseOver?: () => void,
    onMouseOut?: () => void,
    onClick?: () => void,
    id?: string
    style?: React.CSSProperties
}

const Button: React.FC<IButton> = (props) => {
    const {
        children, className, icon, type = 'default', size, disabled, ...rest
    } = props;
    const btnClasses = classNames(
        className,
        'seal-button',
        disabled && 'seal-button-disabled',
        type === 'primary' && 'seal-button-primary',
        type === 'default' && 'seal-button-default',
        size === 'large' && 'seal-button-bg'
    );

    return (
        // eslint-disable-next-line react/button-has-type
        <button
            className={btnClasses}
            {...rest}
        >
            {icon && (
                <span className="seal-button-icon">{icon}</span>
            )}
            {children}
        </button>
    );
};
export default Button;
