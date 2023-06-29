import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Notification from './notification';
import Button from "../button/button";
import IconFont from "../icon/icon";

export default ({
    title: 'Notification',
    component: Notification
}) as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (<Notification {...args} />);


export const defaultNotification = Template.bind({});
defaultNotification.storyName = '主要参数使用';
defaultNotification.args = {
    title: 'Notification Title (Optional)',
    closeable: true,
    message: 'Notification Message (Optional)',
};

export const SuccessNotification = () => (
    <div style={{ display: 'flex', columnGap: '12px' }}>
        <Notification type="info" title="info" />
        <Notification type="success" title="success" />
        <Notification type="warning" title="warning" />
        <Notification type="error" title="error" />
    </div>
)
SuccessNotification.storyName = 'Four types of Notification'

export const ButtonNotification = () => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
        <Notification type="info" title="has button" closeable button={<Button btnType="primary">完成</Button>} />
        <Notification type="error" title="has disabled button" button={<Button btnType="primary" disabled>完成</Button>} />
    </div>
)
ButtonNotification.storyName = 'Notification with button'

export const IconNotification = () => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
        <Notification
            type="warning"
            title="Custom icon (String)"
            closeable
            icon="icon-NoticeOpeningOutlined"
        />
        <Notification
            type="error"
            title="Custom icon (ReactNode)"
            icon={<IconFont className="spin" style={{ fontSize: 32, color: 'grey' }} icon="icon-RefreshOutlined" />}
        />
    </div>
)
IconNotification.storyName = 'Notification with custom icon'

export const NotificationWithStyle = () => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
        <Notification type="info" title="Custom style: {width: '500px'}" closeable  style={{ width: '500px' }} />
    </div>
)
NotificationWithStyle.storyName = 'Notification with custom style'

export const NotificationWithChildren = () => (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '12px' }}>
        <Notification
            type="success"
            title={(
                <Notification
                    type="info"
                    title="Title could be a ReactNode"
                />
            )}
            message={(
                <Notification
                    type="warning"
                    message="Message also could be a ReactNode"
                />
            )}
            closeable
            icon="icon-NoticeOpeningOutlined"
            children={(
                <Notification type="error">
                    Notification could have a Children
                </Notification>
            )}
        />
    </div>
)
NotificationWithChildren.storyName = 'Notification with children'
