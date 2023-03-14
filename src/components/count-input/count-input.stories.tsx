import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CountInput, { ICountInput } from './count-input';

export default ({
    title: 'count input',
    component: CountInput
}) as ComponentMeta<ICountInput>;

const Template: ComponentStory<ICountInput> = (args) => (<CountInput {...args} />);


export const defaultCountInput = Template.bind({});
defaultCountInput.storyName = '主要参数使用';
defaultCountInput.args = {
    defaultValue: 'I am coding...',
    showCount: true,
    type: 'primary',
    maxLength: 30
};
