import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Radio from './radio';

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