import React from 'react';
import classNames from 'classnames';

export interface PoptipProps {
    title: string;
    prefixCls?: string;
}

const PopTip: React.FC<PoptipProps> = ({
    title,
    prefixCls = 'seal',
    children
}) => {
    const classes = classNames(`${prefixCls}-tooltip`, {

    });

    return (
        <div className={classes}>
            <div className={`${prefixCls}-tooltip-arrow`} />
            <div className={`${prefixCls}-tooltip-content`}>
                <div className={`${prefixCls}-tooltip-inner-content`}>
                    { title }
                </div>
            </div>
        </div>
    );
};

export default PopTip;
