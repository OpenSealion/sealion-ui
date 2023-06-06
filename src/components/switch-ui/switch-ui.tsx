/* eslint-disable jsx-a11y/label-has-associated-control */
// https://github.com/storybookjs/storybook/issues/19288
import React, { useState } from 'react';
import classNames from 'classnames';

export type SwitchSizes = 'normal' | 'small';

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onClick'> {
    className?: string,
    size?: SwitchSizes,
    disabled?: boolean,
    defaultChecked?: boolean,
    checked?: boolean,
    onChange?: (checked?: boolean, event?: Event) => void,
    checkedIcon?: React.ReactNode,
    unCheckedUpIcon?: React.ReactNode,
    checkedText?: React.ReactNode,
    unCheckedText?: React.ReactNode,
    onClick?: (checked?: boolean, event?: Event) => void
}

const Switch: React.FC<SwitchProps> = (props) => {
    const {
        className,
        size,
        disabled = false,
        defaultChecked,
        checked,
        onChange,
        checkedIcon,
        unCheckedUpIcon,
        checkedText,
        unCheckedText,
        onClick,
        ...rest
    } = props;
    const [isChecked, setIsChecked] = useState<boolean>(checked || defaultChecked || false);
    const switchClasses = classNames(
        className,
        'seal-switch',
        !!size && `seal-switch-${size}`
    );
    const labelClasses = classNames(
        'seal-switch-label',
        !!size && `seal-switch-label-${size}`
    );
    const sliderClasses = classNames(
        'seal-switch-slider',
        disabled && 'seal-switch-disabled',
        !!size && `seal-switch-slider-${size}`
    );
    const innerIconClasses = classNames(
        'seal-switch-inner',
        !!size && `seal-switch-inner-${size}`
    );
    const innerIconCheckedClasses = classNames(
        'seal-switch-checked-inner',
        !!size && `seal-switch-checked-inner-${size}`
    );
    const innerTextClasses = classNames(
        'seal-switch-text',
        !!size && `seal-switch-text-${size}`
    );
    const innerTextCheckedClasses = classNames(
        'seal-switch-checked-text',
        !!size && `seal-switch-checked-text-${size}`
    );
    const holderClasses = classNames(
        'seal-switch-text-holder',
        !!size && `seal-switch-text-holder-${size}`
    );
    const holderCheckedClasses = classNames(
        'seal-switch-checked-text-holder',
        !!size && `seal-switch-checked-text-holder-${size}`
    );

    const handleChange = (e) => {
        setIsChecked(!isChecked);
        if (onChange) {
            onChange(e.target.checked, e);
        }
        if (onClick) {
            onClick(e.target.checked, e);
        }
    };

    return (
        <div
            className={switchClasses}
            {...rest}
        >
            <label className={labelClasses}>
                <input
                    type="checkbox"
                    className="seal-switch-checkbox"
                    disabled={disabled}
                    checked={isChecked}
                    onChange={handleChange}
                />
                <span className={sliderClasses}>
                    {
                        unCheckedUpIcon && (
                            <div className={innerIconClasses}>{unCheckedUpIcon}</div>
                        )
                    }
                    {
                        checkedIcon && (
                            <div className={innerIconCheckedClasses}>{checkedIcon}</div>
                        )
                    }
                    {
                        !isChecked && unCheckedText && (
                            <div className={innerTextClasses}>{unCheckedText}</div>
                        )
                    }
                    {
                        isChecked && checkedText && (
                            <div className={innerTextCheckedClasses}>{checkedText}</div>
                        )
                    }
                </span>
                {
                    !isChecked && unCheckedText && (
                        <div className={holderClasses}>{unCheckedText}</div>
                    )
                }
                {
                    isChecked && checkedText && (
                        <div className={holderCheckedClasses}>{checkedText}</div>
                    )
                }
            </label>
        </div>
    );
};
export default Switch;
