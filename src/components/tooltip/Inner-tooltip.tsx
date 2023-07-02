import React, {
    useEffect, useRef, forwardRef, Ref, RefAttributes
} from 'react';
import classNames from 'classnames';

export type ToolTipPosition = 'top' | 'bottom' | 'left' | 'right';
export interface PoptipProps {
    title: string;
    position?: ToolTipPosition;
    prefixCls?: string;
}

const PopTip = ({
    title,
    position = 'top',
    prefixCls = 'seal'
}, ref) => {
    const classes = classNames(`${prefixCls}-tooltip`, `${prefixCls}-tooltip-${position}`);

    return (
        <div className={classes} ref={ref}>
            <div className={`${prefixCls}-tooltip-arrow`} />
            <div className={`${prefixCls}-tooltip-content`}>
                <div className={`${prefixCls}-tooltip-inner-content`}>
                    { title }
                </div>
            </div>
        </div>
    );
};

const InnerTooltip = forwardRef<RefAttributes<HTMLElement>, PoptipProps>(PopTip);

export default InnerTooltip;
