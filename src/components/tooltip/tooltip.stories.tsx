import React, { useState, useEffect, useRef } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip, { TooltipProps } from './tooltip';
import InnerTooltip from './Inner-tooltip';
import Button from '../button';

export default ({
    title: 'Tooltip',
    component: Tooltip
});

const Template = (args) => {

    return (
        <Tooltip {...args}>
            <Button btnType="text">hover me</Button>
        </Tooltip>
    )
};


export const defaultDemo = Template.bind({});
defaultDemo.storyName = '主要参数使用';
defaultDemo.args = {
    title: 'hello',
    position: 'top'
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

 export const TooltipPositionDemo = () => {

    return (
        <>
            <div className='inline-block margin-ver-20'>
                <InnerTooltip title="默认/top位置" position="top" />
            </div>
            <div className='inline-block margin-ver-20'>
                <InnerTooltip title="右边位置" position="right" />
            </div>
            <div className='inline-block margin-ver-20'>
                <InnerTooltip title="下边位置" position="bottom" />
            </div>
            <div className='inline-block margin-ver-20'>
                <InnerTooltip title="左边位置" position="left" />
            </div>
        </>
    );
 }

 TooltipPositionDemo.storyName = '不同位置展示';

