import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tabs, { TabsProps } from './tabs';

export default ({
    title: 'Tabs',
    component: Tabs
}) as ComponentMeta<TabsProps>;

const Template: ComponentStory<TabsProps> = (args) => (<Tabs {...args} />);


export const defaultTabs = Template.bind({});
defaultTabs.storyName = '主要参数使用';
defaultTabs.args = {
};
