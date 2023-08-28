import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Radio from './index';

export default ({
    title: 'Radio',
    component: Radio
}) as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => (<Radio {...args}>A</Radio>);

// 默认示例
export const defaultSpin = Template.bind({});
defaultSpin.storyName = '主要参数使用';
defaultSpin.args = {
    value: 'a'
};

// 不可用的Radio
export const disabledRadio = () => (
    <div>
        <Radio value="a" disabled>A</Radio>
        <br />
        <Radio value="b" disabled defaultChecked>B</Radio>
    </div>
);

disabledRadio.storyName = '不可用的Radio';

// 选择组合
export const compoundedRadio = () => {
    const [value, setValue] = useState<string>('a');
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <Radio.Group 
            options={[
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c', disabled: true },
            ]}
            value={value}
            onChange={onChange}
        />
    )
};

compoundedRadio.storyName = '选择组合';

// 选择垂直组合
export const compoundedHorizontalRadio = () => {
    const [value, setValue] = useState<string>('a');
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <Radio.Group 
            options={[
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c', disabled: true },
            ]}
            direction='vertical'
            value={value}
            onChange={onChange}
        />
    )
};

compoundedHorizontalRadio.storyName = '选择垂直组合';

// 自定义组合
export const compoundedSelfRadio = () => {
    const [value, setValue] = useState<string>('a');
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <Radio.Group 
            options={[
                { label: '🌈', value: 'a' },
                { label: <div style={{ color: 'green', fontSize: 40 }}>B</div>, value: 'b' },
                { label: <div style={{ color: 'red' }}>C</div>, value: 'c', disabled: true },
            ]}
            value={value}
            onChange={onChange}
        />
    )
};

compoundedSelfRadio.storyName = '自定义组合';