import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useMounseWheel } from '../../hooks';
import TabItem, { ItemKeyType, TabItemInfoProps } from './tab-item';
import Button from '../button';
import Icon from '../icon';

const getMoveStyle = ({ x = 0, y = 0 }) => {
    return {
        transform: `translate(${x}px, ${y}px)`
    };
};

export const ExtraButton = ({
    onClick,
    isEmpty
}) => {
    const classes = classNames('seal-tabs-extra-btn', isEmpty && 'seal-tabs-empty-extra-btn');

    return (
        <Button
            btnType="icon"
            onClick={onClick}
            className={classes}
        >
            <Icon icon="icon-PlusOutlined" />
        </Button>
    );
};

let uuid = 1;
export interface TabItemObjProps {
    key: string;
    label: string | number;
}

export interface TabsProps extends Omit<React.HTMLAtributes<HTMLDivElement>, 'onChange' | 'children'> {
    className?: string;
    defaultActiveKey?: ItemKeyType;
    items: TabItemObjProps[];
    editable?: boolean;
    style?: React.CSSProperties;
    id?: string;
    onChange?: (activeKey: ItemKeyType) => void;
    onTabClick?: (key: ItemKeyType, event: MouseEvent) => void;
}

const Tabs: React.FC<TabsProps> = ({
    className,
    defaultActiveKey,
    items,
    editable,
    style,
    id,
    onChange = (activeKey: ItemKeyType) => undefined,
    onTabClick = (activeKey: ItemKeyType, event: MouseEvent) => undefined
}) => {
    const [tabList, setTabList] = useState<TabItemObjProps[]>(items);
    const [activeItemKey, setActiveItemKey] = useState<ItemKeyType>(defaultActiveKey);
    const [itemInfoList, setItemInfoList] = useState<TabItemInfoProps[]>([]);
    const [activeItemInfo, setActiveItemInfo] = useState<TabItemInfoProps>({ width: 0, left: 0, itemKey: '' });
    const [position, scrollRef, isExpandContainer] = useMounseWheel(tabList);
    const classes = classNames(className, 'seal-tabs');
    const tabsContainerClasses = classNames('seal-tabs-container', isExpandContainer && 'seal-tabs-near-extra');

    const handleAddClick = () => {
        const newTab = { key: `${uuid++}___$$by-add-button$$`, label: 'new' };
        const newTabList = [...tabList, newTab];
        setTabList(newTabList);
        setActiveItemKey(newTab.key);
        onChange(newTab.key);
    };

    const handleTabItemClick = (item: TabItemInfoProps, event: MouseEvent) => {
        setActiveItemKey(item.itemKey);
        onTabClick(item.itemKey, event);
        onChange(item.itemKey);
    };

    const collectMulTabItemInfo = (info: TabItemInfoProps) => {
        setItemInfoList((prevItemInfoList) => {
            return [...prevItemInfoList, info];
        });
    };

    useEffect(() => {
        // 定位到新增的tabItem
        const findedActiveItemInfo = itemInfoList.find(itemInfo => itemInfo.itemKey === activeItemKey);
        if (findedActiveItemInfo) {
            setActiveItemInfo(findedActiveItemInfo);
        }
    }, [activeItemKey, itemInfoList]);

    const isEmpty = tabList.length === 0;

    return (
        <div className={classes}>
            <div className="seal-tabs-nav">
                <div
                    className={tabsContainerClasses}
                >
                    <div
                        className="seal-tabs-list"
                        ref={scrollRef}
                        style={getMoveStyle(position)}
                    >
                        {
                            tabList.map((obj: TabItemObjProps) => (
                                <div className="seal-tab-item-wrapper" key={obj.key}>
                                    <TabItem
                                        active={activeItemKey === obj.key}
                                        itemKey={obj.key}
                                        onClick={handleTabItemClick}
                                        onMounted={collectMulTabItemInfo}
                                    >
                                        {obj.label}
                                    </TabItem>
                                </div>
                            ))
                        }
                        {
                            editable
                                && !isExpandContainer
                                && (<ExtraButton isEmpty={isEmpty} onClick={handleAddClick} />)
                        }
                        <div
                            className="seal-tabs-ink-bar"
                            style={{
                                width: activeItemInfo.width,
                                left: activeItemInfo.left
                            }}
                        />
                    </div>
                </div>
                {
                    editable
                        && isExpandContainer
                        && (
                            <ExtraButton
                                isEmpty={isEmpty}
                                onClick={handleAddClick}
                            />
                        )
                }
            </div>
        </div>
    );
};

export default Tabs;
