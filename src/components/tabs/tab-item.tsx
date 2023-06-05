import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';

export type ItemKeyType = number | string;

export interface TabItemInfoProps {
    width: number;
    left: number;
    itemKey: ItemKeyType;
}
export interface TabItemProps {
    label: string;
    itemKey: ItemKeyType;
    type?: 'text' | 'card' | 'line'
    style?: React.CSSProperties;
    className?: string;
    active: boolean;
    disabled?: boolean;
    onClick: (key: TabItemInfoProps) => void;
    onMounted: (info: TabItemInfoProps) => void;
}

const TabItem: React.FC<TabItemProps> = ({
    children,
    itemKey,
    type = 'text',
    style,
    className,
    active,
    disabled,
    onClick,
    onMounted,
    ...rest
}) => {
    const itemRef = useRef(null);
    const classes = classNames(
        className,
        'seal-tab-item',
        active && 'seal-tab-item-active',
        disabled && 'seal-tab-item-active',
        `seal-tab-${type}`
    );

    const handleClick = (e: MouseEvent) => {
        const width = itemRef.current.clientWidth;
        const left = itemRef.current.offsetLeft;
        onClick({
            width,
            left,
            itemKey
        }, e);
    };

    useEffect(() => {
        if (itemRef.current && itemKey !== undefined && typeof onMounted === 'function') {
            const width = itemRef.current.clientWidth;
            const left = itemRef.current.offsetLeft;
            onMounted({
                width,
                left,
                itemKey
            });
        }
    }, [itemKey]);

    return (
        <div
            className={classes}
            ref={itemRef}
            style={style}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </div>
    );
};

export default TabItem;
