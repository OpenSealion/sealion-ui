/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import classNames from 'classnames';

export interface RadioProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    className?: string,
    defaultChecked?: boolean,
    checked?: boolean,
    onChange?: (e: Event) => void,
    value: string,
    disabled?: boolean
}

const Radio: React.FC<RadioProps> = (props) => {
    const {
        children,
        className,
        defaultChecked,
        checked,
        onChange,
        value,
        disabled = false
    } = props;
    const [isCheck, setIsCheck] = useState<boolean>(checked || defaultChecked || false);
    const radioClasses = classNames(
        className,
        'seal-radio',
        disabled && 'seal-radio-disabled'
    );
    const innerClasses = classNames(
        'seal-radio-value',
        disabled && 'seal-radio-value-disabled'
    );
    const handleChange = (e) => {
        onChange && onChange(e);
        setIsCheck(e.target.checked);
    };

    return (
        <label className={radioClasses}>
            <input
                type="radio"
                checked={isCheck}
                onChange={handleChange}
                value={value || ''}
                disabled={disabled}
            />
            <span className="seal-radio-inner" />
            {children && <span className={innerClasses}>{children}</span>}
        </label>
    );
};
export default Radio;
