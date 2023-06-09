import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination, { PaginationProps } from './pagination';
import Icon from '../icon';
import Switch from '../switch-ui';

export default ({
    title: 'Pagination',
    component: Pagination
}) as ComponentMeta<PaginationProps>;

const Template: ComponentStory<PaginationProps> = (args) => (<Pagination {...args} />);

// 默认示例
export const defaultSpin = Template.bind({});
defaultSpin.storyName = '主要参数使用';
defaultSpin.args = {

};