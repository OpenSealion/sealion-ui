import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './button';

export default ({
    title: 'Button',
    component: Button
}) as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (<Button {...args} />);

// 按钮默认样式示例
export const defaultButton = Template.bind({});
defaultButton.storyName = '主要参数使用';
defaultButton.args = {
    children: 'Click',
};

export const ButtonWithSize = () => (
    <>
        <Button size="large"> large button </Button>
        <Button> small button </Button>
    </>
);
ButtonWithSize.storyName = '不同尺寸的按钮';

export const ButtonWithColor = () => (
    <>
        <Button type="primary"> primary button </Button>
        <Button type="default"> danger button </Button>
        <Button disabled> disabled button </Button>
    </>
);

ButtonWithColor.storyName = '不同类型的按钮';
