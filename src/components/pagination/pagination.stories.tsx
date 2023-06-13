import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination, { PaginationProps } from './pagination';

export default ({
    title: 'Pagination',
    component: Pagination,
    argTypes: {
        defaultCurrent: {
            description: '默认当前页数',
            control: {
                type: 'number'
            }
        },
        defaultPageSize: {
            description: '默认每页条数',
            control: {
                type: 'number'
            }
        },
        current: {
            description: '当前页数',
            control: {
                type: 'number'
            }
        },
        pageSize: {
            description: '每页条数',
            control: {
                type: 'number'
            }
        },
        total: {
            description: '数据总数',
            control: {
                type: 'number'
            }
        },
        disabled: {
            description: '是否禁用分页'
        },
        showTotal: {
            description: '是否展示总数'
        },
        hideOnSinglePage: {
            description: '单页时是否隐藏分页器'
        },
        itemRender: {
            description: '自定义结构'
        }
    }
}) as ComponentMeta<PaginationProps>;

const Template: ComponentStory<PaginationProps> = (args) => (
    <Pagination
        total={50}
    />
);

// 默认示例
export const defaultPagination = Template.bind({});
defaultPagination.storyName = '主要参数使用';
defaultPagination.args = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    current: null,
    pageSize: null,
    total: null,
    disabled: false,
    showTotal: false,
    hideOnSinglePage: false,
    itemRender: null
};

// 更多分页
export const paginationMore = () => (
    <Pagination
        total={100}
    />
);

paginationMore.storyName = '更多分页';

// 受控页码
export const paginationPage = () => (
    <Pagination
        total={100}
        current={5}
    />
);

paginationPage.storyName = '受控页码';

// disabled页码
export const paginationDisacled = () => (
    <Pagination
        total={100}
        current={5}
        disabled
    />
);

paginationDisacled.storyName = 'disabled页码';

// 展示总数
export const paginationShowTotal = () => (
    <Pagination
        total={100}
        current={5}
        showTotal
    />
);

paginationShowTotal.storyName = '展示总数';

// 自定义结构
export const paginationItemRender = () => {
    const itemRender = (page, type, originalElement) => {
        if (type === 'prev') {
          return <a>prev</a>;
        }
        if (type === 'next') {
          return <a>next</a>;
        }
        return originalElement;
    };
    return (
        <Pagination
            total={100}
            current={5}
            itemRender={itemRender}
        />
    )
};

paginationItemRender.storyName = '自定义结构';