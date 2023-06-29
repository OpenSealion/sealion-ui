import {ComponentMeta, ComponentStory} from "@storybook/react";
import React, {useState} from "react";
import Steps from "../steps/steps";
import { StepItemProps } from './step-item';
import IconFont from "../icon/icon";
export default ({
    title: 'Steps',
    component: Steps
}) as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = (args) => {
    const [current, setCurrent] = useState(1);
    return (
        <div style={{ display: 'flex', gap: 36 }}>
            <Steps
                {...args}
                current={current}
                onChange={(current) => setCurrent(current)}
            />
        </div>
    );
};

const items: Array<StepItemProps> = [
    {
        index: 1,
        title: '第一步',
        description: '这是第一步的描述',
        status: 'error',
    },
    {
        index: 2,
        title: '第二步',
        description: '这是第二步的描述',
    },
    {
        index: 3,
        title: '第三步',
        description: '这是第三步的描述',
        icon: <IconFont icon="icon-UserOutlined" />,
    },
]

export const defaultSteps = Template.bind({});
defaultSteps.storyName = '主要参数使用';
defaultSteps.args = {
    direction: 'horizontal',
    labelPlacement: 'horizontal',
    items: items
};

export const VerticalSteps = () => {
    return (
        <Steps items={items} labelPlacement={'vertical'} />
    )
}

VerticalSteps.storyName = 'Label垂直分布';