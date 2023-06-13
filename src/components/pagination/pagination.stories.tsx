import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination, { PaginationProps } from './pagination';
import Icon from '../icon';
import Switch from '../switch-ui';

export default ({
    title: 'Pagination',
    component: Pagination
}) as ComponentMeta<PaginationProps>;

const Template: ComponentStory<PaginationProps> = (args) => (
    <Pagination
        total={20}
    />
);

// 默认示例
export const defaultPagination = Template.bind({});
defaultPagination.storyName = '主要参数使用';
defaultPagination.args = {

};

// 更多分页
export const paginationMore = () => (
    <Pagination
        total={100}
    />
);

paginationMore.storyName = '更多分页';