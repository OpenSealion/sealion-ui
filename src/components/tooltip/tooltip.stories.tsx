import React, { useState, useEffect, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip, { TooltipProps } from './tooltip';
import Button from '../button';

export default ({
    title: 'Tooltip',
    component: Tooltip
});

const Template = (title, args) => {

    return (<Tooltip title={title} {...args} />)
};


export const defaultDemo = Template.bind({});
defaultDemo.storyName = '主要参数使用';
defaultDemo.args = {
    title: 'hello'
};

 export const TooltipBaseDemo = () => {

    return (
        <>
            <Tooltip title="hello">
                <Button btnType="text">hover me</Button>
            </Tooltip>
        </>
    );
 }

 TooltipBaseDemo.storyName = '基本演示';

