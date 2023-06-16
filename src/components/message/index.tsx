import React from 'react';
import { MessagePortal } from '../react-portal';
import Message, { IMessageProps } from './message';

export type MessageInstanceFn = (props: IMessageProps | string) => void;
export interface MessageInstance {
    info: MessageInstanceFn;
    success: MessageInstanceFn;
    error: MessageInstanceFn;
    warning: MessageInstanceFn;
}

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

const message: MessageInstance = {
    success(props: IMessageProps | string) {
        const messageProps = messagePropsHandler(props, 'success');
        MessagePortal.open(<Message {...messageProps} />);
    },
    warning(props: IMessageProps | string) {
        const messageProps = messagePropsHandler(props, 'warning');
        MessagePortal.open(<Message {...messageProps} />);
    },
    info(props: IMessageProps | string) {
        const messageProps = messagePropsHandler(props, 'info');
        MessagePortal.open(<Message {...messageProps} />);
    },
    error(props: IMessageProps | string) {
        const messageProps = messagePropsHandler(props, 'error');
        MessagePortal.open(<Message {...messageProps} />);
    }
};

export default message;
