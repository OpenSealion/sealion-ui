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
    checked: false,
    checkedIcon: '',
    unCheckedUpIcon: '',
    checkedText: '',
    unCheckedText: ''
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
        <Switch size='small' defaultChecked style={{ marginTop: 5 }} />
    </>
);

switchSmallChecked.storyName = '小尺寸的开关';

// disabled的开关
export const switchDisabledChecked = () => (
    <>
        <Switch disabled />
        <Switch disabled defaultChecked style={{ marginTop: 5 }} />
    </>
);

switchDisabledChecked.storyName = 'disabled的开关';

// 带图标的开关
export const switchIconChecked = () => (
    <>
        <Switch
            unCheckedUpIcon={<Icon icon='icon-NoticeOpeningOutlined' style={{ fontSize: 10 }} />}
            checkedIcon={<Icon icon='icon-NoticeOpeningOutlined' style={{ fontSize: 10 }} />}
            defaultChecked
        />
        <Switch
            unCheckedUpIcon={<Icon icon='icon-NoticeOpeningOutlined' style={{ transform: 'scale(0.5)' }} />}
            checkedIcon={<Icon icon='icon-NoticeOpeningOutlined' style={{ transform: 'scale(0.5)' }} />}
            size='small'
            defaultChecked
            style={{ marginTop: 5 }}
        />
    </>
);

switchIconChecked.storyName = '带图标的开关';

// 带文案的开关
export const switchTextChecked = () => (
    <>
        <Switch
            unCheckedText='关'
            checkedText='开'
            defaultChecked
        />
        <Switch
            unCheckedText='关'
            checkedText='开'
            size='small'
            style={{ marginTop: 5 }}
        />
        <Switch
            unCheckedText='offoffoffoff'
            checkedText='ononononoononon'
            style={{ marginTop: 5 }}
        />
        <Switch
            unCheckedText='offoffoffoff'
            checkedText='ononononoononon'
            style={{ marginTop: 5 }}
            size='small'
        />
    </>
);

switchTextChecked.storyName = '带文案的开关';