import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Breadcrumb, { BreadcrumbProps } from './breadcrumb';
import Icon from '../icon';

export default ({
    title: 'Breadcrumb',
    component: Breadcrumb
}) as ComponentMeta<BreadcrumbProps>;

const Template: ComponentStory<BreadcrumbProps> = (args) => (<Breadcrumb {...args} />)

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
    separator: "/"
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
