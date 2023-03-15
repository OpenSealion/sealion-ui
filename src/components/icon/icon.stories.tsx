import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import IconFont, { IIconFOnt } from './icon';

export default ({
    title: 'icon',
    component: IconFont
}) as ComponentMeta<IIconFOnt>;

const Template: ComponentStory<IIconFOnt> = (args) => (<IconFont {...args} />);


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
