import React from 'react';
import { MessagePortal } from '../react-portal';
import Message, { IMessageProps } from './message';

const message = Message;

message.success = (props: IMessageProps) => {
    const { title } = props;
    MessagePortal.open(<Message
        type="success"
        title={title}
        {...props}
    />);
};
message.warning = (props: IMessageProps) => {
    const { title } = props;
    MessagePortal.open(<Message
        type="warning"
        title={title}
        {...props}
    />);
};
message.info = (props: IMessageProps) => {
    const { title } = props;
    MessagePortal.open(<Message
        type="info"
        title={title}
        {...props}
    />);
};
message.error = (props: IMessageProps) => {
    const { title } = props;
    MessagePortal.open(<Message
        type="error"
        title={title}
        {...props}
    />);
};
export default message;
