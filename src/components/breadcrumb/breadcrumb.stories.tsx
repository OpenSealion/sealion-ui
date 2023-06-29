import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Breadcrumb from './breadcrumb';
import Icon from '../icon';

export default ({
    title: 'Breadcrumb',
    component: Breadcrumb,
    argTypes: {
        items: {
            description: '路由信息'
        },
        separator: {
            description: '自定义分隔符'
        },
        maxCount: {
            description: '最大显示个数'
        }
    }
}) as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (<Breadcrumb items={args?.items} />)

// 默认示例
export const defaultBreadcrumb = Template.bind({});
defaultBreadcrumb.storyName = '主要参数使用';
defaultBreadcrumb.args = {
    items: [
        {
            title: "page1"
        },
        {
            title: <a href="">page2</a>
        },
        {
            title: "page3"
        }
    ],
    separator: "/",
    maxCount: 5
};

// 自定义分隔符
export const breadcrumbSeparatorSelf = () => {
    const items = [
        {
            title: "page1"
        },
        {
            title: <a href="">page2</a>
        },
        {
            title: "page3"
        }
    ];
    return (
        <Breadcrumb
            items={items}
            separator=">"
        />
    )
};

breadcrumbSeparatorSelf.storyName = '自定义分隔符';

// 自定义部分分隔符
export const breadcrumbSeparatorSelfMore = () => {
    const items = [
        {
            title: "page1",
        },
        {
            separator: '>'
        },
        {
            title: <a href="">page2</a>
        },
        {
            separator: '/'
        },
        {
            title: "page3"
        }
    ];
    return (
        <Breadcrumb
            items={items}
            separator=""
        />
    )
};

breadcrumbSeparatorSelfMore.storyName = '自定义部分分隔符';

// 链接可设置为图标
export const breadcrumbItemSelf = () => {
    const items = [
        {
            title: <a href="">
                <Icon icon='icon-SwitchViewOutlined' />
            </a>
        },
        {
            title: <a href="">page2</a>
        },
        {
            title: "page3"
        }
    ];
    return (
        <Breadcrumb
            items={items}
        />
    )
};

breadcrumbItemSelf.storyName = '自定义链接';

// 显示省略
export const breadcrumbEllipsis = () => {
    const items = [
        {
            title: "page1"
        },
        {
            title: <a href="">page2</a>
        },
        {
            title: <a href="">page3</a>
        },
        {
            title: <a href="">page4</a>
        },
        {
            title: <a href="">page5</a>
        },
        {
            title: "page6"
        }
    ];
    return (
        <div>
            <Breadcrumb
                items={items}
            />
            <br />
            <Breadcrumb
                items={items}
                maxCount={6}
            />
        </div>
    )
};

breadcrumbEllipsis.storyName = '显示省略';