import {IMessageProps} from "./message";
import Message from "./index";
import {ComponentMeta, ComponentStory} from "@storybook/react";
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
            {Message.success({title: '成功消息通知'})}
            {Message.error({title: '失败消息通知'})}
            {Message.warning({title: '警告消息通知'})}
            {Message.info({title: '普通消息通知'})}
        </div>
    );
}

runtimeMessage.storyName = '运行时调用message';