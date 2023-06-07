import React, { useEffect } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import IconFont from '../icon';
import Button from '../button/button';
import { ReactPortal } from '../react-portal';

export interface IModalProps {
    children?: React.ReactNode; // 用于自定义内容
    icon?: React.ReactNod; // 用于自定义图标
    closeIcon?: React.ReactNode; // 用于自定义关闭图标
    footer?: React.ReactNode; // 用于自定义底部
    title?: string; // 用于自定义标题
    okText?: string; // 用于自定义确认按钮文字
    cancelText?: string; // 用于自定义取消按钮文字
    showIcon?: boolean; // 是否显示标题图标
    open: boolean; // 是否显示弹窗
    closeable?: boolean; // 是否显示右上角关闭按钮
    maskClosable?: boolean; // 是否允许点击遮罩关闭弹窗
    width?: number; // 弹窗宽度
    onOk?: () => void; // 点击确认按钮的回调
    onCancel?: () => void; // 点击取消按钮的回调
    onClose: () => void; // 点击右上角关闭按钮的回调
    className?: string; // 用于自定义类名
    style?: React.CSSProperties; // 用于自定义样式
}
const ModalCard: React.FC<IModalProps> = (props) => {
    const {
        children,
        title,
        open,
        closeable = true,
        showIcon = true,
        icon,
        closeIcon,
        okText,
        cancelText,
        footer,
        width = 400,
        style,
        className,
        maskClosable = true,
        onOk = () => null,
        onCancel = () => null,
        onClose = () => null,
    } = props;

    const iconClasses = classNames('seal-modal-icon');
    const wrapperClasses = classNames('seal-modal-card', className);
    const Icon = icon || <IconFont icon="icon-InfoFilled" className={iconClasses} />;
    const CloseIcon = closeIcon || (
        <Button btnType="icon" onClick={onClose}>
            <IconFont icon="icon-cuowu1" style={{ fontSize: 24, cursor: 'pointer' }} />
        </Button>
    );

    const FooterNode = footer || (
        <div className="seal-modal-footer">
            <Button
                btnType="secondary"
                onClick={() => {
                    onCancel();
                    onClose();
                }}
                style={{ marginRight: 12 }}
            >
                {cancelText || '取消'}
            </Button>
            <Button
                btnType="primary"
                onClick={() => {
                    onOk();
                    onClose();
                }}
            >
                {okText || '确定'}
            </Button>
        </div>
    );

    useEffect(() => {
        // 使用useEffect来监听键盘事件，esc键关闭弹窗
        const closeOnEscapeKey = e => (e.key === 'Escape' ? onClose() : null);
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
        };
    }, [onClose]);

    // if (!open) return null;

    return (
        <div className={wrapperClasses} style={{ width, ...style }}>
            {showIcon && Icon}
            <div className="seal-modal-right">
                <div className="seal-modal-header">
                    <div className="seal-modal-title">{title}</div>
                    {closeable && CloseIcon}
                </div>
                <div className="seal-modal-content">{children}</div>
                {FooterNode}
            </div>
        </div>
    );
};

export default ModalCard;
