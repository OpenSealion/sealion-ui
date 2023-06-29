import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs from './tabs';
import message from '../message';
import Button from '../button';

export default ({
    title: 'Tabs',
    component: Tabs
}) as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (<Tabs {...args} />);


export const defaultTabs = Template.bind({});
defaultTabs.storyName = '主要参数使用';
defaultTabs.args = {
    defaultActiveKey: 2,
    items: [
        {
            key: 1,
            label: 'tab1'
        },
        {
            key: 2,
            label: 'tab2'
        },
        {
            key: 3,
            label: 'tab3'
        }
    ],
    onTabItemClick: (currentItem, event) => {
        message.info({
            title: `tabKey is ${currentItem.key}`
        });
        console.log(event);
    },
    onChange: (activeKey) => {
        console.log(activeKey);
    }
};

let uuid = 0;

interface IkeyLabel {
    key: string;
    label: string;
}

export const TabWithEdit = () => {
    const [items, setItems] = useState<IkeyLabel[]>([
        {
            key: '1',
            label: 'tab1'
        },
        {
            key: '2',
            label: 'tab2'
        },
        {
            key: '3',
            label: 'tab3'
        }
    ]);

    const handleAddTab = () => {
        uuid++;
        const newTab = { key: `${uuid}___$$by-add-button$$`, label: `new${uuid}` };
        const newTabList: Array<IkeyLabel> = [...items, newTab];
        setItems(newTabList);

    }

    const handleChange = (key) => {
        message.info({
            title: `tabKey is ${key}`
        });
    }

    const handleDel = () => {
        if (items.length )
        setItems(items.slice(0, items.length - 1));
    }

    return (
        <>
            <div>
                <Tabs
                    defaultActiveKey={2}
                    items={items}
                    editable
                    onTabExtraClick={handleAddTab}
                    onChange={handleChange}
                />
            </div>
            <p>
                <Button
                    btnType="primary"
                    status="danger"
                    onClick={handleDel}
                >删除</Button>
            </p>
        </>
      );
}
TabWithEdit.storyName = '新增和关闭标签';


let uuid2 = 0;

export const TabWithScroll = () => {
    const [items, setItems] = useState<Array<IkeyLabel>>(new Array(20).fill(0).map((_, i) => ({
        key: i.toString(),
        label: `tab${i + 1}`
    })));

    const handleAddTab = () => {
        uuid2++;
        const newTab = { key: `${uuid2}___$$by-add-button$$`, label: `new${uuid2}` };
        const newTabList = [...items, newTab];
        setItems(newTabList);

    }

    const handleChange = (key) => {
        message.info({
            title: `tabKey is ${key}`
        });
    }

    const handleDel = () => {
        if (items.length )
        setItems(items.slice(0, items.length - 1));
    }

    return (
        <>
            <div>
                <Tabs
                    defaultActiveKey={2}
                    items={items}
                    editable
                    onTabExtraClick={handleAddTab}
                    onChange={handleChange}
                />
            </div>
            <p>
                <Button
                    btnType="primary"
                    status="danger"
                    onClick={handleDel}
                >删除</Button>
            </p>
        </>
      );
}
TabWithScroll.storyName = '超出可视区,可用鼠标滚轮滚动';
