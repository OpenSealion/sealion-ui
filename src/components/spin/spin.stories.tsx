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
    indicator: '',
    tip: ''
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

// 自定义文案的Spin
export const spinTip = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <Spin tip='加载中...' indicator={null} size='large' />
        <Spin tip='加载中...' indicator={null} />
        <Spin tip='加载中...' indicator={null} size='small' />
    </div>
);

spinTip.storyName = '自定义文案的Spin';


// 图标+文案的Spin
export const spinBoth = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <Spin tip='加载中...' size='large' />
        <Spin tip='加载中...' />
        <Spin tip='加载中...' size='small' />
        {/* <Spin tip='加载中...'>
            <div style={{ padding: 50, background: 'rgba(0, 0, 0, 0.05)', borderRadius: 4 }} />
        </Spin> */}
    </div>
);

spinBoth.storyName = '图标+文案的Spin';

// 自定义图标，会自动旋转的Spin
export const spinIcon = () => (
    <Spin indicator={<Icon icon='icon-SyncOutlined' />} />
);

spinIcon.storyName = '自定义图标，会自动旋转的Spin';
