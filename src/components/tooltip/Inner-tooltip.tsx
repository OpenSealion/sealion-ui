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
    title: React.ReactNode;
    position?: ToolTipPosition;
    prefixCls?: string;
    className?: string;
    arrowClassName?: string;
    contentClassName?: string;
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
    contentClassName,
    theme = {},
    style
}: PoptipProps, ref) => {
    const classes = classNames(className, `${prefixCls}-tooltip`, `${prefixCls}-tooltip-${position}`);
    const arrowClasses = classNames(arrowClassName, `${prefixCls}-tooltip-arrow`);
    const contentClasses = classNames(contentClassName, `${prefixCls}-tooltip-content`);
    const background = (theme as TooltipTheme).background;
    const arrowStyle = background ? { background } : {};

    return (
        <div className={classes} ref={ref} style={{ ...theme, ...style }}>
            <div
                className={arrowClasses}
                style={arrowStyle}
            />
            <div className={contentClasses}>
                { title }
            </div>
        </div>
    );
};

const InnerTooltip = forwardRef<RefAttributes<HTMLElement>, PoptipProps>(PopTip);

export default InnerTooltip;
