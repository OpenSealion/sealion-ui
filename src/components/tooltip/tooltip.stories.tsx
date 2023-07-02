import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tooltip from './tooltip';
import InnerTooltip from './Inner-tooltip';
import Button from '../button';

export default ({
    title: 'Tooltip',
    component: Tooltip
}) as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => {

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
    position: 'right'
};

export const TooltipBaseDemo = () => {

    return (
        <>
            <Tooltip title="hello">
                <Button btnType="text">hover me</Button>
            </Tooltip>
            <Tooltip title="hello" position="right">
                <Button btnType="text">hover me on right</Button>
            </Tooltip>

            <Tooltip title="hello" position="bottom">
                <Button btnType="text">hover me on bottom</Button>
            </Tooltip>

            <Tooltip title="hello" position="left">
                <Button btnType="text">hover me on left</Button>
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

 TooltipPositionDemo.storyName = '不同位置样式展示';

export const TooltipCustomChildDemo = () => {

    return (
        <>
            <div className='inline-block margin-ver-20'>
                <Tooltip title="hello, I am tooltip." position="top">
                    <div style={{
                        width: 100,
                        height: 20,
                        border: '1px solid #000'
                    }}>hello</div>
                </Tooltip>
            </div>
            <div className='inline-block margin-ver-20'>
                <Tooltip title="hello" position="right">
                    <div style={{
                        width: 20,
                        height: 100,
                        border: '1px solid #000'
                    }}>hello</div>
                </Tooltip>
            </div>
            <div className='inline-block margin-ver-20'>
                <Tooltip title="hello" position="bottom">
                    <div style={{
                        width: 100,
                        height: 20,
                        border: '1px solid #000'
                    }}>hello</div>
                </Tooltip>
            </div>
            <div className='inline-block margin-ver-20'>
                <Tooltip title="hello" position="left">
                    <div style={{
                        width: 20,
                        height: 100,
                        border: '1px solid #000'
                    }}>hello</div>
                </Tooltip>
            </div>
        </>
    );
}

TooltipCustomChildDemo.storyName = '非button案例';

