import React, { useEffect } from 'react';
import classNames from 'classnames';
import IconFont from '../icon';

export interface IMessageProps {
    children?: React.ReactNode;
    content?: string;
    title: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    className?: string;
    style?: React.CSSProperties;
    closable?: boolean;
    onClose?: () => void;
}

const iconMap = {
    success: 'icon-CheckCircleFilled',
    error: 'icon-CloseCircleFilled',
    warning: 'icon-InfoFilled',
    info: 'icon-InfoFilled'
};

const colorMap = {
    success: '#00B365',
    error: '#F5483B',
    warning: '#FFA425',
    info: '#1B67FF',
};
const Message: React.FC<IMessageProps> = (props, context) => {
    const {
        title,
        children,
        content,
        type = 'success',
        duration = 50,
        className,
        style,
        closable = false,
        onClose
    } = props;
    const [visible, setVisible] = React.useState(true);
    const wrapperClasses = classNames('seal-message-wrapper', `seal-message-${type}`, className);

    setTimeout(() => {
        setVisible(false);
    }, duration * 1000);

    if (!visible) return null;

    return (
        <div style={{ display: 'inline-block' }}>
            <div className={wrapperClasses} style={style}>
                <IconFont icon={iconMap[type]} style={{ color: colorMap[type] }} className="seal-message-icon" />
                <span className="seal-message-title">{children || title}</span>
                {closable && (
                    <div className="seal-message-close">
                        <IconFont icon="icon-cuowu1" onClick={onClose} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message;
