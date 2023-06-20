import React, {
    useMemo, useState, useEffect, CSSProperties
} from 'react';
import classNames from 'classnames';
import { debounce } from '../../utils/index';

export type SpinSizes = 'small' | 'normal' | 'large';

export type SpinRotate = 'forward' | 'reverse';

export interface SpinProps {
    children?: React.ReactNode,
    size?: SpinSizes,
    className?: string,
    style?: CSSProperties,
    spinning?: boolean,
    indicator?: React.ReactNode,
    tip?: string,
    delay?: number,
    rotate?: SpinRotate
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
        rotate = 'forward',
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
        !!size && `seal-spin-dot-${size}`,
        rotate === 'reverse' && 'seal-spin-dot-reverse'
    );
    const spinTip = classNames(
        'seal-spin-tip',
        !!size && `seal-spin-tip-${size}`
    );
    const spinningClasses = classNames(
        rotate === 'forward' && 'seal-spin-spinning-forward',
        rotate === 'reverse' && 'seal-spin-spinning-reverse'
    );
    const renderIndicator = () => {
        if (indicator === null) {
            return null;
        }
        return (
            <div className={spinningClasses}>
                {
                    indicator || <div className={defaultSpinDotClasses} />
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
