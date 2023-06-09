/* eslint-disable jsx-a11y/label-has-associated-control */
// https://github.com/storybookjs/storybook/issues/19288
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Spin from '../spin';

export type SwitchSizes = 'normal' | 'small';

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onClick'> {
    className?: string,
    size?: SwitchSizes,
    disabled?: boolean,
    defaultChecked?: boolean,
    checked?: boolean,
    onChange?: (checked?: boolean, event?: Event) => void,
    checkedIcon?: React.ReactNode,
    unCheckedIcon?: React.ReactNode,
    checkedText?: React.ReactNode,
    unCheckedText?: React.ReactNode,
    onClick?: (checked?: boolean, event?: Event) => void,
    loading?: boolean
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
        unCheckedIcon,
        checkedText,
        unCheckedText,
        onClick,
        loading = false,
        ...rest
    } = props;
    const [isChecked, setIsChecked] = useState<boolean>(checked || defaultChecked || false);
    const [isLoading, setIsLoading] = useState<boolean>(loading);
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
        (disabled || isLoading) && 'seal-switch-disabled',
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

    const unCheckedTextRender = (classes: string) => !isChecked && unCheckedText && <div className={classes}>{unCheckedText}</div>;

    const checkedTextRender = (classes: string) => isChecked && checkedText && <div className={classes}>{checkedText}</div>;

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    return (
        <div
            className={switchClasses}
            {...rest}
        >
            <label className={labelClasses}>
                <input
                    type="checkbox"
                    className="seal-switch-checkbox"
                    disabled={disabled || loading}
                    checked={isChecked}
                    onChange={handleChange}
                />
                <span className={sliderClasses}>
                    {
                        !isChecked && isLoading && <div className={innerIconClasses}><Spin size="small" /></div>
                    }
                    {
                        !isLoading && unCheckedIcon && (
                            <div className={innerIconClasses}>{unCheckedIcon}</div>
                        )
                    }
                    {
                        isChecked && isLoading && <div className={innerIconCheckedClasses}><Spin size="small" /></div>
                    }
                    {
                        !isLoading && checkedIcon && (
                            <div className={innerIconCheckedClasses}>{checkedIcon}</div>
                        )
                    }
                    {unCheckedTextRender(innerTextClasses)}
                    {checkedTextRender(innerTextCheckedClasses)}
                </span>
                {unCheckedTextRender(holderClasses)}
                {checkedTextRender(holderCheckedClasses)}
            </label>
        </div>
    );
};
export default Switch;
