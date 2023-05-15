import React from 'react';
import { Portal } from "../react-portal";
import Message, {IMessageProps} from './message';
import {createPortal} from "react-dom";

const message = Message;

message.success = (props: IMessageProps) => {
    const { title, duration = 5 } = props;
    Portal.open(<Message
        type="success"
        title={title}
        {...props}
    />);
    setTimeout(() => {
        Portal.destroy();
    }, duration * 1000);
}
message.warning = (props: IMessageProps) => {
    const { title, duration = 5 } = props;
    Portal.open(<Message
        type="warning"
        title={title}
        {...props}
    />);
    setTimeout(() => {
        Portal.destroy();
    }, duration * 1000);
}
message.info = (props: IMessageProps) => {
    const { title, duration = 5 } = props;
    Portal.open(<Message
        type="info"
        title={title}
        {...props}
    />);
    setTimeout(() => {
        Portal.destroy();
    }, duration * 1000);
}
message.error = (props: IMessageProps) => {
    const { title, duration = 5 } = props;
    Portal.open(<Message
        type="error"
        title={title}
        {...props}
    />);
    setTimeout(() => {
        Portal.destroy();
    }, duration * 1000);
}
export default message;
