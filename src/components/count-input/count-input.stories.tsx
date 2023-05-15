import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CountInput, { ICountInput } from './count-input';
import {Form} from "antd";

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
    disabled: false,
};
export const CountInputHandler = () => {
    const [val, setVal] = useState('');

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
                reg={/^[0-9a-zA-Z]+$/}
                validateMessage="ERROR"
                placeholder="this is a placeholder"
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
                reg={/^[0-9a-zA-Z]+$/}
                validateMessage="ERROR"
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
                reg={/^[0-9a-zA-Z]+$/}
            />
        </div>
    );
}
NormalInputHandler.storyName = 'Normal';

export const BlurInputHandler = () => {
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
                reg={/^[0-9a-zA-Z]+$/}
                // onChange={handleChange}
                onBlur={handleChange}
                validateMessage='reg message: /^[0-9a-zA-Z]+$/'
            />
        </div>
    );
}
BlurInputHandler.storyName = 'onBlur';

export const FormInputHandler = () => {
    const [val, setVal] = useState('I am a normal input...');
    const [form] = Form.useForm();

    const handleChange = (value) => {
        setVal(value)
    }

    return (
        <Form form={form}>
            <Form.Item
                name="inputInForm"
                validateTrigger={['onChange']}
                style={{ marginBottom: 24 }}
                rules={[
                    {
                        pattern: /^[0-9a-zA-Z]+$/,
                        message: '报错信息'
                    }
                ]}
            >
                <CountInput
                    maxLength={40}
                    showCount
                />
            </Form.Item>
            <Form.Item
                name="textareaInForm"
                validateTrigger={['onChange']}
                rules={[
                    {
                        pattern: /^[0-9a-zA-Z]+$/,
                        message: '报错信息'
                    }
                ]}
            >
                <CountInput
                    maxLength={40}
                    showCount
                    textarea
                />
            </Form.Item>
        </Form>
    );
}
FormInputHandler.storyName = 'Used in a form';
