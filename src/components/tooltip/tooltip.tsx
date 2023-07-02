import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import InnerTooltip, { PoptipProps, ToolTipPosition, ArrowDiff } from './Inner-tooltip';
import { composeRef } from '../../utils';
import { useMergedState } from '../../hooks';

export interface TooltipProps extends PoptipProps {
    open?: boolean;
    getPopupContainer?: (wrapper?: HTMLElement) => HTMLElement;
    prefixCls?: string;
}

export interface TooltipPositionProps {
    top: number;
    left: number;
}

const getOffesetPosition = (bounding, popBounding, position: ToolTipPosition): TooltipPositionProps => {
    if (!bounding || !popBounding) return { top: 0, left: 0 };
    const diffTop = (bounding.height - popBounding.height) / 2;
    const diffLeft = (bounding.width - popBounding.width) / 2;
    let top = 0;
    let left = 0;

    switch (position) {
    case 'top':
        top = bounding.top - bounding.height;
        left = bounding.left + diffLeft;
        console.log(top, left);
        return { top, left };
    case 'right':
        top = bounding.top - diffTop + ArrowDiff / 2;
        left = bounding.left + bounding.width + ArrowDiff;
        return { top, left };
    case 'bottom':
        top = bounding.top + bounding.height + ArrowDiff;
        left = bounding.left + diffLeft;
        return { top, left };
    case 'left':
        top = bounding.top - diffTop + ArrowDiff / 2;
        left = bounding.left - popBounding.width - ArrowDiff;
        return { top, left };
    default:
        return { top, left };
    }
};

const Tooltip: React.FC<TooltipProps> = ({
    open,
    title,
    position = 'top',
    getPopupContainer = () => document.body,
    prefixCls = 'seal',
    children,
    ...rest
}) => {
    const [mergedOpen, setMergedOpen] = useMergedState<boolean>(false, {
        value: open,
        defaultValue: false
    });
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPositionProps>({ top: 0, left: 0 });
    const onlyChild = React.Children.only(children) as React.ReactElement;
    const childRef = useRef(null);
    const popTipRef = useRef(null);

    const handleMouseEnter = () => {
        setMergedOpen(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        console.log(e.target);
        if (e.target === popTipRef.current) {
            setMergedOpen(false);
        }
    };

    const handleMouseLeave = () => {
        setMergedOpen(false);
    };

    const cloneElementProps: any = {
        ref: composeRef(childRef, onlyChild.ref),
        className: `${prefixCls}-tooltip-open`,
        onMouseEnter: handleMouseEnter,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave
    };

    const cloneElement = React.cloneElement(onlyChild, cloneElementProps);

    useEffect(() => {
        if (mergedOpen && childRef.current) {
            const bounding = childRef.current.getBoundingClientRect();
            const popBounding = popTipRef.current.getBoundingClientRect();
            const offsetPosition = getOffesetPosition(bounding, popBounding, position as ToolTipPosition);
            setTooltipPosition({
                top: offsetPosition.top,
                left: offsetPosition.left
            });
        } else {
            setTooltipPosition({
                top: 0,
                left: 0
            });
        }
    }, [mergedOpen, position]);

    const innerParams = {
        title,
        position,
        ...rest
    };

    const wrapperStyle = {
        position: 'fixed',
        top: tooltipPosition.top,
        left: tooltipPosition.left
    };

    return (
        <>
            { cloneElement }
            {
                createPortal(
                    (
                        <div
                            className={classNames('seal-tooltip-wrapper', mergedOpen && 'seal-toolip-wrapper-open')}
                            style={wrapperStyle}
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
