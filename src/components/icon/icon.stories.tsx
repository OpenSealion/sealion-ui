import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IconFont, { IIconFOnt } from './icon';

export default ({
    title: 'Icon',
    component: IconFont
}) as ComponentMeta<typeof IconFont>;

const Template: ComponentStory<typeof IconFont> = (args) => (<IconFont {...args} />);


export const defaultCountInput = Template.bind({});
defaultCountInput.storyName = '主要参数使用';
defaultCountInput.args = {
    icon: 'icon-bianji',
    color: 'red',
    fontSize: '30px',
    style: {
        background: 'pink'
    }
};
