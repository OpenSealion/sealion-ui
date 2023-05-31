/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';

export type SwitchSizes = 'normal' | 'small';

export interface SwitchProps {
    className?: string,
    size?: SwitchSizes,
    disabled?: boolean,
}

const Switch: React.FC<SwitchProps> = (props) => {
    const {
        className,
        size,
        disabled = false,
        ...rest
    } = props;
    const switchClasses = classNames(
        className,
        'seal-switch',
        disabled && 'seal-switch-disabled',
        !!size && `seal-switch-${size}`
    );
    const sliderClasses = classNames(
        'seal-switch-slider',
        !!size && `seal-switch-slider-${size}`
    );

    return (
        <div
            className={switchClasses}
            {...rest}
        >
            <label className="seal-switch-label">
                <input type="checkbox" className="seal-switch-checkbox" />
                <span className={sliderClasses} />
            </label>
        </div>
    );
};
export default Switch;
