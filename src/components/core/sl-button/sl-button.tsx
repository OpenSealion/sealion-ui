import React from 'react';
import classNames from 'classnames';

export type SLButtonTypes = 'primary' | 'secondary' | 'secondary2' | 'line' | 'text';
export type SLButtonSizes = 'normal' | 'large' | 'small';
export type SLHostButtonType = 'button' | 'submit' | 'reset';
export type SLButtonStatus = 'success' | 'warn' | 'danger';

export interface SLButtonProps {
    btnType?: SLButtonTypes;
    size?: SLButtonSizes;
    className?: string;
    type?: SLHostButtonType;
    status: SLButtonStatus;
}

const SLButton: React.FC<SLButtonProps> = ({
    btnType = 'primary',
    size = 'normal',
    className,
    children,
    type = 'button',
    status,
    ...rest
}) => {
    const classes = classNames(
        className,
        'sea-lion-core-button',
        btnType && `sea-lion-core-button-${btnType}`,
        size && `sea-lion-core-button-${size}`,
        status && `sea-lion-core-button-${status}`
    );

    return (
        <button
            className={classes}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
};

export default SLButton;
