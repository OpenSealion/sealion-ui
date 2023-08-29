/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { RadioGroupContext } from './context';

export interface RadioProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    className?: string,
    defaultChecked?: boolean,
    checked?: boolean,
    onChange?: (e: Event) => void,
    value: any,
    disabled?: boolean,
}

const Radio: React.FC<RadioProps> = (props) => {
    const {
        children,
        className,
        defaultChecked,
        checked,
        onChange,
        value,
        disabled = false,
        ...rest
    } = props;
    const groupContext = React.useContext(RadioGroupContext);
    const restProp: any = { ...rest };
    if (groupContext?.name) {
        restProp.name = groupContext?.name;
    }
    const [isCheck, setIsCheck] = useState<boolean>(checked || defaultChecked || false);
    const radioClasses = classNames(
        className,
        'seal-radio',
        disabled && 'seal-radio-disabled'
    );
    const valueClasses = classNames(
        'seal-radio-value',
        disabled && 'seal-radio-value-disabled'
    );
    const handleChange = (e) => {
        if (disabled) {
            return;
        }
        if (!('checked' in props)) {
            setIsCheck(e.target.checked);
        }
        onChange?.(e);
        groupContext?.onChange?.(e);
    };

    useEffect(() => {
        if (groupContext?.value) {
            setIsCheck(value === groupContext?.value);
        }
    }, [groupContext?.value]);

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
            {children && <span className={valueClasses}>{children}</span>}
        </label>
    );
};
export default Radio;
