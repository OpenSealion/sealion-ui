import React from 'react';
import { MessagePortal } from '../react-portal';
import Message, { IMessageProps } from './message';

const message = Message;

const messagePropsHandler = (props: (IMessageProps | string), type: string) => {
    if (typeof props === 'string') {
        return {
            type,
            title: props
        };
    }
    if (typeof props === 'object') {
        const { title } = props;
        return {
            type,
            title: title?.toString(),
            ...props
        };
    }
    return {
        type,
        title: '',
    };
};

message.success = (props: IMessageProps | string) => {
    const messageProps = messagePropsHandler(props, 'success');
    MessagePortal.open(<Message {...messageProps} />);
};
message.warning = (props: IMessageProps) => {
    const messageProps = messagePropsHandler(props, 'warning');
    MessagePortal.open(<Message {...messageProps} />);
};
message.info = (props: IMessageProps) => {
    const messageProps = messagePropsHandler(props, 'info');
    MessagePortal.open(<Message {...messageProps} />);
};
message.error = (props: IMessageProps) => {
    const messageProps = messagePropsHandler(props, 'error');
    MessagePortal.open(<Message {...messageProps} />);
};
export default message;
