import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Switch, { SwitchProps } from './switch-ui';
import Icon from '../icon';

export default ({
    title: 'Switch',
    component: Switch,
    argTypes: {
        size: {
            description: '开关大小，可选值：normal small',
            control: {
                type: 'select',
                options: ['normal', 'small']
            }
        },
        disabled: {
            description: '是否禁用',
        },
        defaultChecked: {
            description: '初始是否选中'
        },
        checked: {
            description: '指定当前是否选中'
        },
        checkedIcon: {
            description: '开关打开时，按钮上显示的图标',
            control: {
                type: 'string'
            }
        },
        unCheckedIcon: {
            description: '开关关闭时，按钮上显示的图标',
            control: {
                type: 'string'
            }
        },
        checkedText: {
            description: '开关打开时的文案',
            control: {
                type: 'string'
            }
        },
        unCheckedText: {
            description: '开关关闭时的文案',
            control: {
                type: 'string'
            }
        },
        loading: {
            description: '加载中的开关'
        }
    }
}) as ComponentMeta<SwitchProps>;

const Template: ComponentStory<SwitchProps> = (args) => (<Switch />);

// 默认示例
export const defaultSwitch = Template.bind({});
defaultSwitch.storyName = '主要参数使用';
defaultSwitch.args = {
    size: 'normal',
    disabled: false,
    defaultChecked: false,
    checked: false,
    checkedIcon: '',
    unCheckedIcon: '',
    checkedText: '',
    unCheckedText: '',
    loading: false
};

// 默认打开的开关
export const switchDefaultChecked = () => (
    <Switch defaultChecked />
);

switchDefaultChecked.storyName = '默认打开的开关';

// 小尺寸的开关
export const switchSmallChecked = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <Switch size="small" />
        <Switch size="small" defaultChecked />
    </div>
);

switchSmallChecked.storyName = '小尺寸的开关';

// disabled的开关
export const switchDisabledChecked = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <Switch disabled />
        <Switch disabled defaultChecked />
    </div>
);

switchDisabledChecked.storyName = 'disabled的开关';

// 带图标的开关
export const switchIconChecked = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <Switch
            unCheckedIcon={<Icon icon="icon-NoticeOpeningOutlined" style={{ fontSize: 10 }} />}
            checkedIcon={<Icon icon="icon-NoticeOpeningOutlined" style={{ fontSize: 10 }} />}
            defaultChecked
        />
        <Switch
            unCheckedIcon={<Icon icon="icon-NoticeOpeningOutlined" style={{ transform: "scale(0.5)" }} />}
            checkedIcon={<Icon icon="icon-NoticeOpeningOutlined" style={{ transform: "scale(0.5)" }} />}
            size="small"
            defaultChecked
        />
    </div>
);

switchIconChecked.storyName = '带图标的开关';

// 带文案的开关
export const switchTextChecked = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <Switch
            unCheckedText="关"
            checkedText="开"
            defaultChecked
        />
        <Switch
            unCheckedText="off"
            checkedText="on"
            size="small"
        />
    </div>
);

switchTextChecked.storyName = '带文案的开关';

// loading的开关
export const switchLoading = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <Switch
            defaultChecked
            loading
        />
        <Switch
            size="small"
            loading
        />
    </div>
);

switchLoading.storyName = 'loading的开关';