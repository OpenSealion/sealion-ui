import React from 'react';
import { MessagePortal } from '../react-portal';
import Message, { IMessageProps } from './message';

const message = Message;

message.success = (props: IMessageProps | string) => {
    if (typeof props === 'string') {
        MessagePortal.open(<Message
            type="success"
            title={props}
        />);
    } else if (typeof props === 'object') {
        const { title } = props;
        MessagePortal.open(<Message
            type="success"
            title={title}
            {...props}
        />);
    }
};
message.warning = (props: IMessageProps) => {
    if (typeof props === 'string') {
        MessagePortal.open(<Message
            type="warning"
            title={props}
        />);
    } else if (typeof props === 'object') {
        const { title } = props;
        MessagePortal.open(<Message
            type="warning"
            title={title}
            {...props}
        />);
    }
};
message.info = (props: IMessageProps) => {
    if (typeof props === 'string') {
        MessagePortal.open(<Message
            type="info"
            title={props}
        />);
    } else if (typeof props === 'object') {
        const { title } = props;
        MessagePortal.open(<Message
            type="info"
            title={title}
            {...props}
        />);
    }
};
message.error = (props: IMessageProps) => {
    if (typeof props === 'string') {
        MessagePortal.open(<Message
            type="error"
            title={props}
        />);
    } else if (typeof props === 'object') {
        const { title } = props;
        MessagePortal.open(<Message
            type="error"
            title={title}
            {...props}
        />);
    }
};
export default message;
