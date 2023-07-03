import React from 'react';
import classNames from 'classnames';

export type SLButtonTypes = 'primary' | 'secondary' | 'secondary2' | 'line' | 'text' | 'icon' | 'icon2' | 'link' | 'link2';
export type SLButtonSizes = 'normal' | 'large' | 'small';
export type SLHostButtonType = 'button' | 'submit' | 'reset';
export type SLButtonStatus = 'success' | 'warn' | 'danger';

export interface SLButtonProps extends Omit<React.ButtonHTMLAttributes<any>, 'type'> {
    btnType?: SLButtonTypes;
    size?: SLButtonSizes;
    className?: string;
    type?: SLHostButtonType;
    status?: SLButtonStatus;
}

const BaseSLButton = (
    {
        btnType,
        size,
        className,
        children,
        type = 'button',
        status,
        ...rest
    }: SLButtonProps,
    ref
) => {
    const classes = classNames(
        className,
        'sea-lion-core-button',
        btnType && `sea-lion-core-button-${btnType}`,
        size && `sea-lion-core-button-${size}`,
        status && `sea-lion-core-button-${status}`
    );
    return (
        <button
            ref={ref}
            className={classes}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
};

const SLButton = React.forwardRef<React.RefAttributes<HTMLButtonElement>, SLButtonProps>(BaseSLButton);

export default SLButton;
