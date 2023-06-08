import React from 'react';
import classNames from 'classnames';

export type SpinSizes = 'small' | 'normal' | 'large';

export interface SpinProps {
    size?: SpinSizes,
    className?: string,
    spinning?: boolean,
    indicator?: React.ReactNode
}

const Spin: React.FC<SpinProps> = (props) => {
    const {
        className,
        size = 'normal',
        spinning = true,
        indicator,
        ...rest
    } = props;
    const spinClasses = classNames(
        className,
        'seal-spin',
        !spinning && 'seal-spin-spinning-disabled'
    );
    const defaultSpinDotClasses = classNames(
        'seal-spin-dot',
        !!size && `seal-spin-dot-${size}`
    );
    const defaultSpinDotItemClasses = classNames(
        'seal-spin-dot-item',
        !!size && `seal-spin-dot-item-${size}`
    );

    return (
        <div
            className={spinClasses}
            {...rest}
        >
            {
                indicator || <div className={defaultSpinDotClasses}><div className={defaultSpinDotItemClasses} /></div>
            }
        </div>
    );
};
export default Spin;
