import React, { useEffect, useRef, Children } from 'react';
import { createPortal } from 'react-dom';
import InnerTooltip, { PoptipProps } from './Inner-tooltip';

export interface TooltipProps extends PoptipProps {
    open?: boolean;
    getPopupContainer?: (wrapper?: HTMLElement) => HTMLElement;
}

const Tooltip: React.FC<TooltipProps> = ({
    open,
    title,
    position,
    getPopupContainer = () => document.body,
    children,
    ...rest
}) => {
    const wrapperRef = useRef(null);
    const tooltipContentRef = useRef(null);

    useEffect(() => {
        if (open) {
            wrapperRef.current.appendChild(tooltipContentRef.current);
        } else {
            wrapperRef.current.removeChild(tooltipContentRef.current);
        }
    }, [open]);

    const innerParams = {
        title,
        position,
        ...rest
    };

    // const renderChildren = () => {
    //     const newChildren = Children.forEach()

    //     return ();
    // }

    return (
        <>
            { children }
            {
                createPortal((<InnerTooltip {...innerParams} ref={tooltipContentRef} />), getPopupContainer())
            }
        </>
    );
};

export default Tooltip;
