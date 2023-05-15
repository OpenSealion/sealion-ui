import Message, {IMessageProps} from "./message";
import message from "./index";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "../button/button";
export default ({
    title: 'message',
    component: Message
}) as ComponentMeta<IMessageProps>;

const Template: ComponentStory<IMessageProps> = (args) => (<Message {...args} />);


export const defaultMessage = Template.bind({});
defaultMessage.storyName = '主要参数使用';
defaultMessage.args = {
    type: 'success',
    title: 'Success Message',
};
export const typesMessage = () => {
    return (
        <div style={{ display: 'flex', gap: 36 }}>
            <Message
                type="success"
                title="成功消息通知"
            />
            <Message
                type="warning"
                title="警告消息通知"
            />
            <Message
                type="info"
                title="普通消息通知"
            />
            <Message
                type="error"
                title="失败消息通知"
            />
        </div>
    );
}
typesMessage.storyName = '不同类型的消息通知';

export const runtimeMessage = () => {
    return (
        <div style={{ display: 'flex', gap: 36 }}>
            <Button
                btnType="primary"
                onClick={() => {
                    message.success({title: '成功消息通知hhhhhhhhhhhh'});
                }}
            >
                成功消息通知
            </Button>
            <Button
                btnType="primary"
                onClick={() => {
                    message.error({title: '失败消息通知'});
                }}
            >
                失败消息通知
            </Button>
            <Button
                btnType="primary"
                onClick={() => {
                    message.warning({title: '警告消息通知'})
                }}
            >
                警告消息通知
            </Button>
            <Button
                btnType="primary"
                onClick={() => {
                    message.info({title: '普通消息通知'})
                }}
            >
                普通消息通知
            </Button>
        </div>
    );
}

runtimeMessage.storyName = '运行时调用message';