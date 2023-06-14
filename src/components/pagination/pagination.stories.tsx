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
        },
        size: {
            description: '有两种尺寸',
            control: {
                type: 'select',
                options: ['normal', 'small']
            }
        },
        bufferSize: {
            description: '隐藏页和当前之间的距离'
        },
        showQuickJump: {
            description: '是否支持快速跳转'
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
    itemRender: null,
    size: 'normal',
    bufferSize: 2,
    showQuickJump: false
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
    <div>
        <Pagination
            total={100}
            current={5}
        />
        <br />
        <Pagination
            total={100}
            current={5}
            bufferSize={1}
        />
    </div>
);

paginationPage.storyName = '受控页码';

// disabled页码
export const paginationDisacled = () => (
    <div>
        <Pagination
            total={100}
            current={5}
            disabled
        />
        <br />
        <Pagination
            total={100}
            current={5}
            showQuickJump
            disabled
        />
    </div>
);

paginationDisacled.storyName = 'disabled页码';

// 展示总数
export const paginationShowTotal = () => (
    <div>
        <Pagination
            total={100}
            current={5}
            showTotal
        />
        <br />
        <Pagination
            total={100}
            current={5}
            showQuickJump
            showTotal
        />
    </div>
);

paginationShowTotal.storyName = '展示总数';

// 支持快速跳转
export const paginationQuickJump = () => (
    <Pagination
        total={100}
        current={5}
        showQuickJump
    />
);

paginationQuickJump.storyName = '支持快速跳转';

// 小号分页
export const paginationSmall = () => (
    <div>
        <Pagination
            total={100}
            size="small"
        />
        <br />
        <Pagination
            total={100}
            current={5}
            disabled
            size="small"
        />
        <br />
        <Pagination
            total={100}
            current={5}
            showTotal
            size="small"
        />
        <br />
        <Pagination
            total={100}
            current={5}
            showQuickJump
            size="small"
        />
    </div>
);

paginationSmall.storyName = '小号分页';

// 自定义结构
export const paginationItemRender = () => {
    const itemRender = (page, type, originalElement) => {
        if (type === "prev") {
          return <a>prev</a>;
        }
        if (type === "next") {
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