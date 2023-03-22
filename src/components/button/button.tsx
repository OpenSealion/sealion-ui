import React from 'react';
import classNames from 'classnames';
import SLButton, {
    SLButtonProps
} from '../core/sl-button/sl-button';

export interface ButtonProps extends SLButtonProps {
    className?: string,
    disabled?: boolean,
    pure?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        className,
        btnType,
        size,
        status,
        disabled = false,
        pure = false,
        children,
        ...rest
    } = props;
    const themeClasses = classNames(
        className,
        'seal-button',
        disabled && 'seal-button-disabled',
        {
            [`seal-button-${btnType}`]: !!btnType,
            [`seal-button-${size}`]: !!size,
            [`seal-button-${status}`]: !!status
        }
    );

    const btnClasses = pure ? '' : themeClasses;

    return (
        // eslint-disable-next-line react/button-has-type
        <SLButton
            className={btnClasses}
            btnType={btnType}
            size={size}
            status={status}
            disabled={disabled}
            {...rest}
        >
            {children}
        </SLButton>
    );
};
export default Button;
