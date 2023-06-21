import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spin, { SpinProps } from './spin';
import Icon from '../icon';
import Switch from '../switch-ui';

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
    tip: '',
    delay: 0,
    className: '',
    rotate: 'forward'
};

// 不同尺寸
export const spinSize = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <Spin size='large' />
        <Spin />
        <Spin size='small' />
    </div>
);

spinSize.storyName = '不同尺寸';

// 自定义文案
export const spinTip = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <Spin tip='加载中...' indicator={null} size='large' />
        <Spin tip='加载中...' indicator={null} />
        <Spin tip='加载中...' indicator={null} size='small' />
    </div>
);

spinTip.storyName = '自定义文案';


// 图标+文案
export const spinBoth = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <Spin tip='加载中...' size='large' />
        <Spin tip='加载中...' />
        <Spin tip='加载中...' size='small' />
    </div>
);

spinBoth.storyName = '图标+文案';

// 放入容器中
export const spinContainer = () => (
    <div style={{ padding: '20px 0', textAlign: 'center', background: 'rgba(0, 0, 0, 0.05)' }}>
        <Spin tip='加载中...' />
    </div>
);

spinContainer.storyName = '放入容器中';


// 切换加载中
export const spinNested = () => {
    const [loading, setLoading] = useState(true);
    const toggle = (checked: boolean) => {
        setLoading(checked);
    };
    return (
        <div>
            <Spin tip='加载中...' spinning={loading}>
                <div style={{ padding: 50, background: '#91caff', borderRadius: 4 }}>
                    please click me
                </div>
            </Spin>
            <div style={{ marginTop: 15 }}>
                <Switch checked={loading} onClick={toggle} />
            </div>
        </div>
    )
};

spinNested.storyName = '切换加载中';

// 延迟加载中
export const spinNestedDelay = () => {
    const [loading, setLoading] = useState(false);
    const toggle = (checked: boolean) => {
        setLoading(checked);
    };
    return (
        <div>
            <Spin tip='加载中...' spinning={loading} delay={1000}>
                <div style={{ padding: 50, background: '#91caff', borderRadius: 4 }}>
                    please click me
                </div>
            </Spin>
            <div style={{ marginTop: 15 }}>
                <Switch checked={loading} onClick={toggle} />
            </div>
        </div>
    )
};

spinNestedDelay.storyName = '延迟加载中';

// 逆时针转动
export const spinReverse = () => (
    <Spin rotate="reverse" />
);

spinReverse.storyName = '逆时针转动';

// 自定义图标，会自动旋转
export const spinIcon = () => (
    <Spin indicator={<Icon icon='icon-SyncOutlined' />} />
);

spinIcon.storyName = '自定义图标，会自动旋转';
