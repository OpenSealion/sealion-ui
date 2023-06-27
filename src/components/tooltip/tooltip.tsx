import React from 'react';
import { createPortal } from 'react-dom';
import PopTip, { PoptipProps } from './pop-tip';

export interface TooltipProps extends PoptipProps {
    open?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
    open,
    children
}) => {
    return (
        <>
            { children }
            {
                createPortal((<PopTip title="hello" />), document.body)
            }
        </>
    );
};

export default Tooltip;
