/* eslint-disable jsx-a11y/label-has-associated-control */
// https://github.com/storybookjs/storybook/issues/19288
import React, { useState } from 'react';
import classNames from 'classnames';

export type SwitchSizes = 'normal' | 'small';

export interface SwitchProps extends Omit<React.HTMLAttributes<any>, 'onChange' | 'onClick'> {
    className?: string,
    size?: SwitchSizes,
    disabled?: boolean,
    defaultChecked?: boolean,
    checked?: boolean,
    onChange?: (checked?: boolean, event?: Event) => void,
    checkedIcon?: React.ReactNode,
    unCheckedUpIcon?: React.ReactNode,
    checkedText?: React.ReactNode,
    unCheckedText?: React.ReactNode
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
        ...rest
    } = props;
    const [isChecked, setIsChecked] = useState<boolean>(checked || defaultChecked || false);
    const switchClasses = classNames(
        className,
        'seal-switch',
        !!size && `seal-switch-${size}`
    );
    const sliderClasses = classNames(
        'seal-switch-slider',
        disabled && 'seal-switch-disabled',
        !!size && `seal-switch-slider-${size}`
    );
    const innerUpClasses = classNames(
        'seal-switch-inner',
        !!size && `seal-switch-inner-${size}`
    );
    const innerUpCheckedClasses = classNames(
        'seal-switch-checked-inner',
        !!size && `seal-switch-checked-inner-${size}`
    );

    const handleChange = (e) => {
        setIsChecked(!isChecked);
        if (onChange) {
            onChange(e.target.checked, e);
        }
    };

    return (
        <div
            className={switchClasses}
            {...rest}
        >
            <label className="seal-switch-label">
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
                            <div className={innerUpClasses}>{unCheckedUpIcon}</div>
                        )
                    }
                    {
                        checkedIcon && (
                            <div className={innerUpCheckedClasses}>{checkedIcon}</div>
                        )
                    }
                </span>
            </label>
        </div>
    );
};
export default Switch;
