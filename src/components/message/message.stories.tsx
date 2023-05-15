import Message, {IMessageProps} from "./message";
import message from "./index";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button, {ButtonProps} from "../button/button";
export default ({
    title: 'message',
    component: Button
}) as ComponentMeta<ButtonProps>;

const Template: ComponentStory<ButtonProps> = (args) => (<Button {...args} />);


export const defaultMessage = Template.bind({});
defaultMessage.storyName = '主要参数使用';
defaultMessage.args = {
    children: '确认',
    btnType: 'primary',
    size: 'normal',
    onClick: () => {

    }
};
// export const typesMessage = () => {
//     return (
//         <div style={{ display: 'flex', gap: 36 }}>
//             <Message
//                 type="success"
//                 title="成功消息通知"
//                 duration={3000}
//             />
//             <Message
//                 type="warning"
//                 title="警告消息通知"
//                 duration={3000}
//             />
//             <Message
//                 type="info"
//                 title="普通消息通知"
//                 duration={3000}
//             />
//             <Message
//                 type="error"
//                 title="失败消息通知"
//                 duration={3000}
//             />
//         </div>
//     );
// }
// typesMessage.storyName = '不同类型的消息通知';

export const runtimeMessage = () => {
    return (
        <div style={{ display: 'flex', gap: 36 }}>
            <Button
                btnType="primary"
                status={'success'}
                onClick={() => {
                    message.success({title: '成功消息通知'});
                }}
            >
                成功消息通知
            </Button>
            <Button
                btnType="primary"
                status={'danger'}
                onClick={() => {
                    message.error({title: '失败消息通知'});
                }}
            >
                失败消息通知
            </Button>
            <Button
                btnType="primary"
                status={'warn'}
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