import React, { useState, useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input, { InputProps } from './input';
import Button from '../button';
import IconFont from '../icon';
import message from '../message';

export default ({
    title: 'Input',
    component: Input
}) as ComponentMeta<InputProps>;

const Template: ComponentStory<InputProps> = (args) => (<Input {...args} />);


export const defaultInput = Template.bind({});
defaultInput.storyName = '主要参数使用';
defaultInput.args = {
    value: 'wwww.sealion.com',
    prepend: (
        <div style={{width: 100}}>
            url:
        </div>
    ),
    append: (<div>.com</div>),
    prefix: (<IconFont
        icon={'icon-CheckCircleFilled'}
        style={{ color: 'green' }}
    />),
    suffix: '300 / 99999'
 };

 export const InputBaseDemo = () => {
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <Input
                placeholder="请输入"
                onChange={handleChange}
                value={value}
            />
        </>
    );
 }

InputBaseDemo.storyName = '基本演示';

export const InputDisabledDemo = () => {
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <Input
                disabled
                onChange={handleChange}
                value={value}
            />
        </>
    );
 }

 InputDisabledDemo.storyName = '禁止输入';

 export const InputAffixDemo = () => {
    const maxNum = 30;
    const [value, setValue] = useState('hello');
    const handleChange = (e) => {
        const val = e.target.value;
        if (val.length > maxNum) return;
        setValue(e.target.value);
    }

    const [value2, setValue2] = useState('username');
    const handleChange2 = e => {
        setValue2(e.target.value);
    }

    return (
        <>
            <p>
                <Input
                    onChange={handleChange}
                    value={value}
                    suffix={`${value.length} / ${maxNum}`}
                />
            </p>
            <p>
                <Input
                    onChange={handleChange2}
                    value={value2}
                    prefix={(<IconFont
                        icon={'icon-TeamOutlined'}
                    />)}
                />
            </p>
        </>
    );
 }

InputAffixDemo.storyName = '前缀/后缀';

export const InputPendDemo = () => {
    const [value, setValue] = useState('sea-lion-ui');
    const handleChange = (e) => {
        const val = e.target.value;
        setValue(e.target.value);
    }

    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            message.info('search');
        }

        if (e.type === 'click') {
            message.info('search');
        }
    }

    return (
        <>
            <p style={{ width: 400 }}>
                <Input
                    onChange={handleChange}
                    value={value}
                    prepend={
                        <Button btnType="primary">http://</Button>
                    }
                    append={
                        <Button btnType="primary">.com</Button>
                    }
                />
            </p>
            <p style={{ width: 400 }}>
                <Input
                    onChange={handleChange}
                    value={value}
                    onKeyDown={handleSearch}
                    append={
                        <Button
                            btnType="primary"
                            onClick={handleSearch}
                        >enter search</Button>
                    }
                />
            </p>

        </>
    );
 }

 InputPendDemo.storyName = '前置/后置标签';

export const InputNoControl = () => {
    const handleChange = (e) => {
        const val = e.target.value;
        console.log('[from uncontrol input]', val);
    }

    return (
        <>
            <p>
                <Input
                    defaultValue="I am default value"
                    onChange={handleChange}
                />
            </p>
        </>
    );
 }

 InputNoControl.storyName = '非受控input';


