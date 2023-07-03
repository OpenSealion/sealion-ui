import React, {
    forwardRef, RefAttributes
} from 'react';
import classNames from 'classnames';

export type ToolTipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipTheme {
    color?: string;
    background?: string;
    padding?: string;
    fontSize?: number;
}
export interface PoptipProps {
    title: string;
    position?: ToolTipPosition;
    prefixCls?: string;
    className?: string;
    arrowClassName?: string;
    theme?: TooltipTheme;
    style?: React.CSSProperties;
}

export const ArrowDiff = 6;

const PopTip = ({
    title,
    position = 'top',
    prefixCls = 'seal',
    className,
    arrowClassName,
    theme = {},
    style
}: PoptipProps, ref) => {
    const classes = classNames(className, `${prefixCls}-tooltip`, `${prefixCls}-tooltip-${position}`);
    const arrowClasses = classNames(arrowClassName, `${prefixCls}-tooltip-arrow`);
    const background = (theme as TooltipTheme).background;
    const arrowStyle = background ? { background } : {};

    return (
        <div className={classes} ref={ref} style={{ ...theme, ...style }}>
            <div
                className={arrowClasses}
                style={arrowStyle}
            />
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
