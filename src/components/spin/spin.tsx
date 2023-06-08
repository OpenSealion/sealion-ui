import React, { useMemo, useState, useEffect, CSSProperties } from 'react';
import classNames from 'classnames';
import { debounce } from 'throttle-debounce';

export type SpinSizes = 'small' | 'normal' | 'large';

export interface SpinProps {
    children?: React.ReactNode,
    size?: SpinSizes,
    className?: string,
    style?: CSSProperties,
    spinning?: boolean,
    indicator?: React.ReactNode,
    tip?: string,
    delay?: number
}

const Spin: React.FC<SpinProps> = (props) => {
    const {
        children,
        style,
        className,
        size = 'normal',
        spinning = true,
        indicator,
        tip,
        delay = 0,
        ...rest
    } = props;
    const [loading, setLoading] = useState<boolean>(spinning);
    const spinClasses = classNames(
        className,
        'seal-spin',
        !!size && `seal-spin-${size}`,
        !loading && 'seal-spin-spinning-disabled'
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
    const isNestedPattern = useMemo<boolean>(() => typeof children !== 'undefined', [children]);
    const containerClasses = classNames(
        loading && 'seal-spin-blur'
    );
    useEffect(() => {
        const showSpinning = debounce(delay, () => {
            setLoading(spinning);
        });
        showSpinning();
        return () => {
            showSpinning?.cancel?.();
        };
    }, [delay, spinning]);
    const spinElement = (
        <div
            className={spinClasses}
            style={style}
            {...rest}
        >
            {renderIndicator()}
            {
                tip && <div className={spinTip}>{tip}</div>
            }
        </div>
    );

    if (isNestedPattern) {
        return (
            <div {...rest} className="seal-spin-nested-loading">
                <div className="seal-spin-show-text">{spinElement}</div>
                <div className={containerClasses}>{children}</div>
            </div>
        );
    }

    return spinElement;
};
export default Spin;
