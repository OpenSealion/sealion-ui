import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs, { TabsProps } from './tabs';
import message from '../message';

export default ({
    title: 'Tabs',
    component: Tabs
}) as ComponentMeta<TabsProps>;

const Template: ComponentStory<TabsProps> = (args) => (<Tabs {...args} />);


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
    editable: true,
    onTabClick: (activeKey, event) => {
        message.info({
            title: `tabKey is ${activeKey}`
        });
        console.log(event);
    },
    onChange: (activeKey) => {
        console.log(activeKey);
        // do something after change
    }
};
