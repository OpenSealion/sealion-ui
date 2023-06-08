import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spin, { SpinProps } from './spin';
import Icon from '../icon';

export default ({
    title: 'Spin',
    component: Spin
}) as ComponentMeta<SpinProps>;

const Template: ComponentStory<SpinProps> = (args) => (<Spin {...args} />);

// 默认示例
export const defaultSpin = Template.bind({});
defaultSpin.storyName = '主要参数使用';
defaultSpin.args = {
    size: 'normal',
    spinning: true,
    indicator: ''
};

// 不同尺寸的Spin
export const spinSize = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Spin size='large' />
        <Spin />
        <Spin size='small' />
    </div>
);

spinSize.storyName = '不同尺寸的Spin';

// 自定义图标，会自动旋转的Spin
export const spinIcon = () => (
    <Spin indicator={<Icon icon='icon-SyncOutlined' />} />
);

spinIcon.storyName = '自定义图标，会自动旋转的Spin';