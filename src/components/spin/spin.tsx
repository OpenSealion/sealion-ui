import React from 'react';
import classNames from 'classnames';

export type SpinSizes = 'small' | 'normal' | 'large';

export interface SpinProps {
    children?: React.ReactNode,
    size?: SpinSizes,
    className?: string,
    spinning?: boolean,
    indicator?: React.ReactNode,
    tip?: string
}

const Spin: React.FC<SpinProps> = (props) => {
    const {
        children,
        className,
        size = 'normal',
        spinning = true,
        indicator,
        tip,
        ...rest
    } = props;
    const spinClasses = classNames(
        className,
        'seal-spin',
        !!size && `seal-spin-${size}`,
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
    const spinTip = classNames(
        'seal-spin-tip',
        !!size && `seal-spin-tip-${size}`
    );
    const renderIndicator = () => {
        if (indicator === null) {
            return null;
        }
        return (
            <div className="seal-spin-spinning">
                {
                    indicator || (
                        <div className={defaultSpinDotClasses}>
                            <div className={defaultSpinDotItemClasses} />
                        </div>
                    )
                }
            </div>
        );
    };

    return (
        <div
            className={spinClasses}
            {...rest}
        >
            {renderIndicator()}
            {
                tip && <div className={spinTip}>{tip}</div>
            }
            {children}
        </div>
    );
};
export default Spin;
