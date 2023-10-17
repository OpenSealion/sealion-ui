import React, {
    useEffect, useRef, useState, Children
} from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import InnerTooltip, { PoptipProps, ToolTipPosition, ArrowDiff } from './Inner-tooltip';
import { composeRef } from '../../utils';
import { useMergedState } from '../../hooks';

export interface TooltipProps extends PoptipProps {
    open?: boolean;
    getPopupContainer?: (wrapper?: HTMLElement) => HTMLElement;
    prefixCls?: string;
    mouseLeaveDelay?: number; // 延迟消失时间，单位毫秒
    children?: React.ReactNode; // 兼容react18
    autoPosition?: boolean;
}

export interface TooltipPositionProps {
    top: number;
    left: number;
    width: number;
    height: number;
}

const getOffesetPosition = (bounding, popBounding, position: ToolTipPosition): TooltipPositionProps => {
    if (!bounding || !popBounding) {
        return {
            top: 0, left: 0, width: 0, height: 0
        };
    }
    const diffTop = (bounding.height - popBounding.height) / 2;
    const diffLeft = (bounding.width - popBounding.width) / 2;
    let top = 0;
    let left = 0;

    const width = popBounding.width;
    const height = popBounding.height;

    switch (position) {
    case 'top':
        top = bounding.top - popBounding.height - ArrowDiff;
        left = bounding.left + diffLeft;
        break;
    case 'right':
        top = bounding.top + diffTop;
        left = bounding.left + bounding.width + ArrowDiff;
        break;
    case 'bottom':
        top = bounding.top + bounding.height + ArrowDiff;
        left = bounding.left + diffLeft;
        break;
    default:
    // 'left'
        top = bounding.top + diffTop;
        left = bounding.left - popBounding.width - ArrowDiff;
    }
    return {
        top, left, width, height
    };
};

const calcPositionByBoundary = (targetBounding, tooltipBounding, position: ToolTipPosition): ToolTipPosition => {
    const minHozBoundary = 0;
    const maxHozBoundary = window.innerWidth;
    const minVerBoundary = 0;
    const maxVerBoundary = window.innerHeight;

    const isShowInTop = targetBounding.top - minVerBoundary > tooltipBounding.height;
    const isShowInBottom = maxVerBoundary - targetBounding.bottom > tooltipBounding.height;
    const isShowLeft = targetBounding.left - minHozBoundary > tooltipBounding.width;
    const isShowRight = maxHozBoundary - targetBounding.right > tooltipBounding.width;

    if (position === 'top') {
        return isShowInTop ? 'top' : 'bottom';
    } if (position === 'bottom') {
        return isShowInBottom ? 'bottom' : 'top';
    } if (position === 'left') {
        return isShowLeft ? 'left' : 'right';
    } if (position === 'right') {
        return isShowRight ? 'right' : 'left';
    }

    return position;
};

const Tooltip: React.FC<TooltipProps> = ({
    open,
    title,
    position = 'top',
    autoPosition = false,
    getPopupContainer = () => document.body,
    mouseLeaveDelay = 30,
    children,
    ...rest
}) => {
    const [mergedOpen, setMergedOpen] = useMergedState<boolean>(false, {
        value: open,
        defaultValue: false
    });
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPositionProps>({
        top: 0, left: 0, width: 0, height: 0
    });
    const [mergedPosition, setMergedPosition] = useState<ToolTipPosition>(position);
    const onlyChild = React.Children.only(children) as React.ReactElement;
    const childRef = useRef(null);
    const popTipRef = useRef(null);
    const mouseLeaveDebounceRef = useRef(null);

    const handleMouseEnter = () => {
        setMergedOpen(true);
    };

    const handleMouseMove = () => {
        setMergedOpen(true);
    };

    const handleMouseLeave = () => {
        mouseLeaveDebounceRef.current && clearTimeout(mouseLeaveDebounceRef.current);
        mouseLeaveDebounceRef.current = setTimeout(() => {
            setMergedOpen(false);
        }, mouseLeaveDelay);
    };

    const onlyChildRef = (onlyChild as any).ref;
    const mouseEventProps = {
        onMouseEnter: handleMouseEnter,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave
    };
    const cloneElementProps: any = {
        ref: composeRef(childRef, onlyChildRef),
        /**
         * 如果需要合并className
         * {Children.map(children, (child, index) =>
                cloneElement(child, {
                    className: classNames(child.props.className, 'my-class')
                })
            )}
         */
        // className: `${prefixCls}-tooltip-open`,
        ...mouseEventProps
    };

    const cloneElement = React.cloneElement(onlyChild, cloneElementProps);

    useEffect(() => {
        if (mergedOpen && childRef.current) {
            const bounding = childRef.current.getBoundingClientRect();
            const popBounding = popTipRef.current.getBoundingClientRect();
            const calcPosition = autoPosition ? calcPositionByBoundary(bounding, popBounding, position) : position;
            const offsetPosition = getOffesetPosition(bounding, popBounding, calcPosition as ToolTipPosition);
            setTooltipPosition(offsetPosition);
            setMergedPosition(calcPosition);
        } else {
            setTooltipPosition({
                top: -99999,
                left: -99999,
                width: 0,
                height: 0
            });
        }
    }, [mergedOpen, position, autoPosition]);

    const innerParams = {
        title,
        position: mergedPosition,
        ...rest
    };

    const wrapperStyle: React.CSSProperties = {
        position: 'fixed',
        top: tooltipPosition.top,
        left: tooltipPosition.left
    };

    return (
        <>
            { cloneElement }
            {
                mergedOpen
                && createPortal(
                    (
                        <div
                            className={classNames('seal-tooltip-wrapper', mergedOpen && 'seal-toolip-wrapper-open')}
                            style={wrapperStyle}
                            {...mouseEventProps}
                        >
                            <InnerTooltip {...innerParams} ref={popTipRef} />
                        </div>
                    ), getPopupContainer()
                )
            }
        </>
    );
};

export default Tooltip;
