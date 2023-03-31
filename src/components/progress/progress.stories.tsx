import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Progress , { IProgress } from './progress';

export default ({
    title: 'Progress',
    component: Progress
}) as ComponentMeta<IProgress>;

const Template: ComponentStory<IProgress> = (args) => (<Progress {...args} />);


export const defaultProgress = Template.bind({});
defaultProgress.storyName = '主要参数使用';
defaultProgress.args = {
    percent: 60,
    status: 'info',
    strokeWidth: 8
};

export const BarProgress = () => {
    return (
        <div>
            <Progress
                percent={30}
                status="info"
            />
            <Progress
                percent={50}
                status="info"
            />
            <Progress
                percent={100}
                status="success"
            />
            <Progress
                percent={50}
                status="error"
            />
        </div>
    )
}
BarProgress.storyName = 'Bar Progress'

export const CircleProgress = () => {
    return (
        <div class="row">
            <Progress
                type="circle"
                status="info"
            />
            <Progress
                type="circle"
                percent={100}
                status="success"
            />
            <Progress
                type="circle"
                status="warning"
            />
            <Progress
                type="circle"
                status="error"
            />
        </div>
    )
}
CircleProgress.storyName = 'Circle Progress'
