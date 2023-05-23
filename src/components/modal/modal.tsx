import React, { useEffect } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import IconFont from '../icon';
import Button from '../button/button';
import { ReactPortal } from '../react-portal';
import ModalCard from './modal-card';

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
const Modal: React.FC<IModalProps> = (props) => {
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
    const nodeRef = React.useRef(null);

    const wrapperClasses = classNames('seal-modal-wrapper', className);

    return (
        <ReactPortal>
            <CSSTransition
                in={open}
                timeout={{ entry: 200, exit: 0 }}
                unmountOnExit
                classNames="seal-modal-animation"
                nodeRef={nodeRef}
            >
                <div className="seal-modal-root" ref={nodeRef}>
                    {maskClosable && <div className="seal-modal-mask" onClick={onClose} />}
                    <ModalCard {...props} className={wrapperClasses} />
                </div>
            </CSSTransition>
        </ReactPortal>
    );
};

export default Modal;
