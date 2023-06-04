import React, { useState } from 'react';
import classNames from 'classnames';
import { useMounseWheel } from '../../hooks';
import TabItem, { ItemKeyType, TabItemInfoProps } from './tab-item';
import Button from '../button';
import Icon from '../icon';

export interface TabsProps extends Omit<React.HTMLAtributes<HTMLDivElement>, 'onChange' | 'children'> {
    className?: string;
    defaultActiveKey?: ItemKeyType;
    style?: React.CSSProperties;
    id?: string;
    onChange?: (activeKey: string) => void;
}

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

let TabItemObjIndex = 1;
export interface TabItemObjProps {
    key: string;
    label: string | number;
}

const Tabs: React.FC<TabsProps> = ({
    className,
    defaultActiveKey,
    style,
    id,
    onChange
}) => {
    const [tabList, setTabList] = useState<TabItemObjProps[]>([]);
    const [activeItemKey, setActiveItemKey] = useState<ItemKeyType>(defaultActiveKey);
    const [activeItemInfo, setActiveItemInfo] = useState<TabItemInfoProps>({ width: 0, left: 0, itemKey: '' });
    const [position, scrollRef, isExpandContainer] = useMounseWheel(tabList);
    const classes = classNames(className, 'seal-tabs');
    const tabsContainerClasses = classNames('seal-tabs-container', isExpandContainer && 'seal-tabs-near-extra');

    const handleAddClick = () => {
        const newTab = { key: `${TabItemObjIndex++}`, label: 'new' };
        const newTabList = [...tabList, newTab];
        setTabList(newTabList);
        setActiveItemKey(newTab.key);
    };

    const handleTabItemClick = (item: TabItemInfoProps) => {
        setActiveItemInfo(item);
        setActiveItemKey(item.itemKey);
    };

    const collectMulTabItemInfo = (info: TabItemInfoProps) => {
        setActiveItemInfo(info);
    };
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
                            tabList.map((obj, i) => (
                                <div className="seal-tab-item-wrapper" key={obj.key}>
                                    <TabItem
                                        active={activeItemKey === obj.key}
                                        itemKey={obj.key}
                                        onClick={handleTabItemClick}
                                        onMounted={collectMulTabItemInfo}
                                    >
                                        {`模型名称${i}`}
                                    </TabItem>
                                </div>
                            ))
                        }
                        {
                            !isExpandContainer && (<ExtraButton isEmpty={isEmpty} onClick={handleAddClick} />)
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
                    isExpandContainer
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
