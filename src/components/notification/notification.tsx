import React from "react";
import IconFont from "../icon";

export interface INotification {
    icon?: string | React.ReactNode;
    title?: string | React.ReactNode;
    message?: string | React.ReactNode;
    button?: React.ReactNode;
    closeable?: boolean;
    onClose?: () => void;
    type?: 'info' | 'success' | 'warning' | 'error';
}

const defaultProps = {
    info: {
        icon: 'icon-InfoFilled',
        color: '#0D53DE',
        background: '#E6F2FF',
    },
    success: {
        icon: 'icon-CheckCircleFilled',
        color: '#00B365',
        background: '#DAF2E4',
    },
    warning: {
        icon: 'icon-InfoFilled',
        color: '#FF8800',
        background: '#FFF7E6',
    },
    error: {
        icon: 'icon-CloseCircleFilled',
        color: '#F5483B',
        background: '#FFF3F0',
    },
};

const Notification: React.FC<INotification> = ({
   icon,
   title = '',
   message = '',
   button,
   closeable = false,
   onClose,
   type = 'info',
   children
}) => {
    const [close, setClose] = React.useState(false);

    const hasCustomIcon = typeof icon !== 'string' && React.isValidElement(icon);
    const hasCustomButton = React.isValidElement(button);

    const handleClose = () => {
        setClose(true);
        onClose && onClose();
    };

    return !close && (
        <div className="notification" style={{ borderColor: defaultProps[type].color, backgroundColor: defaultProps[type].background }}>
            {closeable && (
                <div className="close" onClick={handleClose}>
                    <IconFont icon="icon-cuowu1" style={{ fontSize: '16px', lineHeight: 1, color: '#464A53' }} />
                </div>
            )}
            <div className="wrapper">
                {hasCustomIcon ? icon : <IconFont icon={(icon || defaultProps[type].icon) as string} className="default-icon" style={{ color: defaultProps[type].color }} />}
                <div className="text">
                    {title && <span className="title" style={{ color: defaultProps[type].color }}>{title}</span>}
                    {(message || children) && <span className="desc">{message || children}</span>}
                </div>
                {hasCustomButton && <div className="button">{button}</div>}
            </div>
        </div>
    );
};

export default Notification;
