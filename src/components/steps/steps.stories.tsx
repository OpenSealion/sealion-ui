import {ComponentMeta, ComponentStory} from "@storybook/react";
import React, {useState} from "react";
import Steps from "../steps/steps";
import {StepItemProps} from "@/components/steps/step-item";
export default ({
    title: 'Steps',
    component: Steps
}) as ComponentMeta<StepItemProps>;

const Template: ComponentStory<StepItemProps> = (args) => {
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


export const defaultSteps = Template.bind({});
defaultSteps.storyName = '主要参数使用';
defaultSteps.args = {
    direction: 'horizontal',
    labelPlacement: 'horizontal',
    items: [
        {
            title: '第一步',
            description: '这是第一步的描述',
        },
        {
            title: '第二步',
            description: '这是第二步的描述',
        },
        {
            title: '第三步',
            description: '这是第三步的描述',
        },
    ]
};
