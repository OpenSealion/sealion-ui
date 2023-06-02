import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Switch, { SwitchProps } from './switch-ui';
import Icon from '../icon';

export default ({
    title: 'Switch',
    component: Switch
}) as ComponentMeta<SwitchProps>;

const Template: ComponentStory<SwitchProps> = (args) => (<Switch {...args} />);

// 默认示例
export const defaultSwitch = Template.bind({});
defaultSwitch.storyName = '主要参数使用';
defaultSwitch.args = {
    size: 'normal',
    disabled: false,
    defaultChecked: false,
    checked: false
};

// 默认打开的开关
export const switchDefaultChecked = () => (
    <Switch defaultChecked />
);

switchDefaultChecked.storyName = '默认打开的开关';

// 小尺寸的开关
export const switchSmallChecked = () => (
    <>
        <Switch size='small' />
        <Switch size='small' defaultChecked />
    </>
);

switchSmallChecked.storyName = '小尺寸的开关';

// disabled的开关
export const switchDisabledChecked = () => (
    <>
        <Switch disabled />
        <Switch disabled defaultChecked />
    </>
);

switchDisabledChecked.storyName = 'disabled的开关';

// 带文字或者图标的开关
export const switchChildrenChecked = () => (
    <>
        <Switch unCheckedUpChildren={<Icon icon='icon-NoticeOpeningOutlined' />} />
        <Switch defaultChecked checkedUpChildren={<Icon icon='icon-NoticeOpeningOutlined' />} />
        <Switch unCheckedUpChildren={<Icon icon='icon-NoticeOpeningOutlined' />} size='small' />
        <Switch defaultChecked checkedUpChildren={<Icon icon='icon-NoticeOpeningOutlined' />} size='small' />
    </>
);

switchChildrenChecked.storyName = '带文字或者图标的开关';