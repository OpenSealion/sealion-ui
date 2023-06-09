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
    editable?: boolean;
    type?: 'text' | 'card' | 'line';
    style?: React.CSSProperties;
    className?: string;
    active: boolean;
    disabled?: boolean;
    onClick: (item: TabItemInfoProps) => void;
    onDelBtnClick: (item: TabItemInfoProps) => void | boolean;
    onMounted: (info: TabItemInfoProps) => void;
}

const TabItem: React.FC<TabItemProps> = ({
    children,
    itemKey,
    editable,
    type = 'text',
    style,
    className,
    active,
    disabled,
    onClick,
    onDelBtnClick,
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
        const item = {
            width,
            left,
            itemKey
        };
        if (editable && onDelBtnClick(item) === false) {
            return;
        }
        onClick(item, e);
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
