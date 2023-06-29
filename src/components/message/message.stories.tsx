import React from "react";
import Message, {IMessageProps} from "./message";
import message from "./index";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "../button/button";
export default ({
    title: 'Message',
    component: Message
}) as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => (<Button
    btnType="primary"
    onClick={() => {
        message.info({...args})
    }}
>
    点击出现消息通知
</Button>);


export const defaultMessage = Template.bind({});
defaultMessage.storyName = '主要参数使用';
defaultMessage.args = {
    title: '普通消息通知',
    type: 'info',
    duration: 5,
};
export const typesMessage = () => {
    return (
        <div style={{ display: 'flex', gap: 36 }}>
            <Message
                type="success"
                title="成功消息通知"
                duration={3000}
            />
            <Message
                type="warning"
                title="警告消息通知"
                duration={3000}
            />
            <Message
                type="info"
                title="普通消息通知"
                duration={3000}
            />
            <Message
                type="error"
                title="失败消息通知"
                duration={3000}
            />
            <Message
                type="loading"
                title="加载消息通知"
                duration={3000}
            />
        </div>
    );
}
typesMessage.storyName = '不同类型的消息通知';

export const runtimeMessage = () => {
    const ref = React.useRef(null);
    return (
        <div style={{ display: 'flex', gap: 36 }}>
            {/*<div ref={ref}>x</div>*/}
            <Button
                btnType="primary"
                status={'success'}
                onClick={() => {
                    message.success({title: '成功消息通知, duration: 20s', duration: 20});
                }}
            >
                成功消息通知
            </Button>
            <Button
                btnType="primary"
                status={'danger'}
                onClick={() => {
                    message.error('失败消息通知');
                }}
            >
                失败消息通知
            </Button>
            <Button
                btnType="primary"
                status={'warn'}
                onClick={() => {
                    message.warning('警告消息通知')
                }}
            >
                警告消息通知
            </Button>
            <Button
                btnType="primary"
                onClick={() => {
                    message.info('普通消息通知')
                }}
            >
                普通消息通知
            </Button>
        </div>
    );
}

runtimeMessage.storyName = '运行时调用message';