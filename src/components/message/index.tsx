import Message, {IMessageProps} from './message';

Message.success = (props: IMessageProps) => {
    const { title, duration = 5 } = props;
    return (
        <Message
            type="success"
            title={title}
            {...props}
        />
    )
}
Message.warning = (props: IMessageProps) => {
    const { title, duration = 5 } = props;
    return (
        <Message
            type="warning"
            title={title}
            {...props}
        />
    )
}
Message.info = (props: IMessageProps) => {
    const { title, duration = 5 } = props;
    return (
        <Message
            type="info"
            title={title}
            {...props}
        />
    )
}
Message.error = (props: IMessageProps) => {
    const { title, duration = 5 } = props;
    return (
        <Message
            type="error"
            title={title}
            {...props}
        />
    )
}
export default Message;
