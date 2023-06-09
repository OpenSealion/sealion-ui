import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useMounseWheel } from '../../hooks';
import TabItem, { ItemKeyType, TabItemInfoProps } from './tab-item';
import { TabContext } from './tab-context';
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

export interface TabItemObjProps {
    key: string;
    label: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAtributes<HTMLDivElement>, 'onChange' | 'children'> {
    className?: string;
    defaultActiveKey?: ItemKeyType;
    items: TabItemObjProps[];
    editable?: boolean;
    style?: React.CSSProperties;
    id?: string;
    onChange?: (activeKey: ItemKeyType) => void;
    onTabExtraClick?: () => void;
    onTabItemClick?: (item: TabItemObjProps, list: TabItemObjProps[], event: MouseEvent) => void;
    onTabItemDelClick?: (item: TabItemObjProps) => boolean | void; // 当该回调函数return false时，onTabItemClick就不会触发
}

export type EditActionType = 'add' | 'remove' | '';

const Tabs = ({
    className,
    defaultActiveKey,
    items,
    editable,
    style,
    id,
    onChange = (activeKey) => undefined,
    onTabExtraClick = () => undefined,
    onTabItemClick = (item, list, e) => undefined,
    onTabItemDelClick = (item) => undefined,
}: TabsProps, ref: React.Ref<HTMLDivElement>) => {
    const [activeKey, setActiveKey] = useState<ItemKeyType>(defaultActiveKey);
    const editActionRef = useRef<EditActionType>('');
    const [itemInfoList, setItemInfoList] = useState<TabItemInfoProps[]>([]);
    const [activeItemInfo, setActiveItemInfo] = useState<TabItemInfoProps>({ width: 0, left: 0, itemKey: '' });
    const [position, scrollRef, isExpandContainer] = useMounseWheel(items);
    const classes = classNames(className, 'seal-tabs');
    const tabsContainerClasses = classNames('seal-tabs-container', isExpandContainer && 'seal-tabs-near-extra');

    const handleAddClick = () => {
        editActionRef.current = 'add';
        onTabExtraClick();
    };

    const handleTabItemClick = (item: TabItemInfoProps, event: MouseEvent) => {
        setActiveKey(item.itemKey);
        const currentItem = items.find(tabItem => tabItem.key === item.itemKey);
        onTabItemClick(currentItem, items, event);
        onChange(item.itemKey);
    };

    const collectMulTabItemInfo = (info: TabItemInfoProps) => {
        setItemInfoList((prevItemInfoList) => {
            return [...prevItemInfoList, info];
        });
    };

    useEffect(() => {
        // 定位到新增的tabItem
        const findedActiveItemInfo = itemInfoList.find(itemInfo => itemInfo.itemKey === activeKey);
        if (findedActiveItemInfo) {
            setActiveItemInfo(findedActiveItemInfo);
        }
    }, [activeKey, itemInfoList]);

    useEffect(() => {
        if (typeof onChange === 'function') {
            // 当items变动时既有可能是删除，也有可能是增加
            // 所以需要检查当前的key是否还在数组中
            // 如果还在，则不需要改变选中
            // 如果不在，则是删除当前的key，选中的item需要移到
            const currentItem = items.find(item => item.key === activeKey);
            if (!currentItem && items.length > 0) {
                const newItem = items[items.length - 1];
                setActiveKey(newItem.key);
                onChange(newItem.key);
            }

            editActionRef.current = '';
        }
    }, [items, onChange, activeKey]);

    const isEmpty = items.length === 0;

    return (
        <TabContext.Provider>
            <div
                className={classes}
                id={id}
                ref={ref}
            >
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
                                items.map((obj: TabItemObjProps) => (
                                    <div className="seal-tab-item-wrapper" key={obj.key}>
                                        <TabItem
                                            active={activeKey === obj.key}
                                            itemKey={obj.key}
                                            editable={editable}
                                            onClick={handleTabItemClick}
                                            onDelBtnClick={onTabItemDelClick}
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
                            {
                                !isEmpty
                                && (
                                    <div
                                        className="seal-tabs-ink-bar"
                                        style={{
                                            width: activeItemInfo.width,
                                            left: activeItemInfo.left
                                        }}
                                    />
                                )
                            }
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
        </TabContext.Provider>
    );
};

const ForwardTabs = React.forwardRef(Tabs);

export default ForwardTabs;
