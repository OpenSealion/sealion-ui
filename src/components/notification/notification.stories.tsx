import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Notification , { INotification } from './notification';
import Button from "../button/button";

export default ({
    title: 'Notification',
    component: Notification
}) as ComponentMeta<INotification>;

const Template: ComponentStory<INotification> = (args) => (<Notification {...args} />);


export const defaultNotification = Template.bind({});
defaultNotification.storyName = '主要参数使用';
defaultNotification.args = {
    title: 'Notification Title',
    closeable: true,
    message: 'Notification Message (Optional)'
};

export const SuccessNotification = () => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
        <Notification type="info" title="info" />
        <Notification type="success" title="success" />
        <Notification type="warning" title="warning" />
        <Notification type="error" title="error" />
    </div>
)
SuccessNotification.storyName = 'Four types of Notification'

export const ButtonNotification = () => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
        <Notification type="info" title="has button" button={<Button btnType="primary">完成</Button>} />
        <Notification type="error" title="has disabled button" button={<Button btnType="primary" disabled>完成</Button>} />
    </div>
)
ButtonNotification.storyName = 'Notification with button'
