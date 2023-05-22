import React, { useEffect } from 'react';
import classNames from 'classnames';
import IconFont from '../icon';

export interface IMessageProps {
    children?: React.ReactNode; // 用于自定义内容
    content?: string; // 用于自定义内容
    title: string; // 用于自定义标题
    type?: 'success' | 'error' | 'warning' | 'info'; // 消息类型
    duration?: number; // 持续时间
    className?: string; // 自定义类名
    style?: React.CSSProperties; // 自定义样式
    closable?: boolean; // 是否显示关闭按钮
    onClose?: () => void; // 关闭回调
}

const iconMap = {
    success: 'icon-CheckCircleFilled',
    error: 'icon-CloseCircleFilled',
    warning: 'icon-InfoFilled',
    info: 'icon-InfoFilled',
    loading: 'icon-RefreshOutlined'
};

const colorMap = {
    success: '#00B365',
    error: '#F5483B',
    warning: '#FFA425',
    info: '#1B67FF',
    loading: '#1B67FF',
};
const Message: React.FC<IMessageProps> = (props, context) => {
    const {
        title,
        children,
        content,
        type = 'success',
        duration = 5,
        className,
        style,
        closable = false,
        onClose = () => null
    } = props;
    const [visible, setVisible] = React.useState(true);
    const iconClasses = classNames('seal-message-icon', type === 'loading' && 'seal-message-loading');
    const wrapperClasses = classNames('seal-message-wrapper', `seal-message-${type}`, className);

    setTimeout(() => {
        onClose();
        setVisible(false);
    }, duration * 1000);

    if (!visible) return null;

    return (
        <div>
            <div className={wrapperClasses} style={style}>
                <IconFont icon={iconMap[type]} style={{ color: colorMap[type] }} className={iconClasses} />
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
