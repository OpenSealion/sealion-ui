import React, { useState } from 'react';
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
    maxLength: 30,
};
export const CountInputHandler = () => {
    const [val, setVal] = useState('I am coding...');

    const handleChange = (value) => {
        setVal(value)
    }

    return (
        <div>
            <CountInput
                maxLength={30}
                showCount
                value={val}
                onChange={handleChange}
            />
        </div>
    );
}
CountInputHandler.storyName = 'onChange';

export const CountTextareaHandler = () => {
    const [val, setVal] = useState('I am a textarea...');

    const handleChange = (value) => {
        setVal(value)
    }

    return (
        <div>
            <CountInput
                maxLength={200}
                showCount
                value={val}
                onChange={handleChange}
                textarea
            />
        </div>
    );
}

CountTextareaHandler.storyName = 'Textarea';


export const NormalInputHandler = () => {
    const [val, setVal] = useState('I am a normal input...');

    const handleChange = (value) => {
        setVal(value)
    }

    return (
        <div>
            <CountInput
                maxLength={40}
                showCount={false}
                value={val}
                onChange={handleChange}
            />
        </div>
    );
}

NormalInputHandler.storyName = 'Normal';
