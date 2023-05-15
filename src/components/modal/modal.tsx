import React, {useEffect} from "react";
import IconFont from "../icon";
import classNames from "classnames";
import Button from "../button/button";
import {ReactPortal} from "../react-portal";
import { CSSTransition } from "react-transition-group";

export interface IModalProps {
    children?: React.ReactNode;
    icon?: React.ReactNod;
    closeIcon?: React.ReactNode;
    footer?: React.ReactNode;
    title?: string;
    okText?: string;
    cancelText?: string;
    showIcon?: boolean;
    open: boolean;
    closeAble?: boolean;
    maskClosable?: boolean;
    width?: number;
    onOk?: () => void;
    onCancel?: () => void;
    onClose: () => void;
    className?: string;
    style?: React.CSSProperties;
}
const Modal: React.FC<IModalProps> = (props) => {
    const {
        children,
        title,
        open,
        closeAble = true,
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
        onOk = () => {},
        onCancel = () => {},
        onClose = () => {},
    } = props;
    const nodeRef = React.useRef(null);

    const wrapperClasses = classNames('seal-modal-wrapper', className);
    const Icon = icon || <IconFont icon={'icon-InfoFilled'} style={{ color: '#1B67FF', fontSize: 24 }}/>;
    const CloseIcon = closeIcon || (
        <Button btnType={'icon'} onClick={onClose}>
            <IconFont icon={'icon-cuowu1'} style={{ fontSize: 24, cursor: 'pointer' }}/>
        </Button>
    )

    const FooterNode = footer || (
        <div className={'seal-modal-footer'}>
            <Button btnType={'secondary'} onClick={() => {
                onCancel();
                onClose();
            }}>
                {cancelText || '取消'}
            </Button>
            <Button btnType={'primary'} onClick={() => {
                onOk();
                onClose();
            }}>
                {okText || '确定'}
            </Button>
        </div>
    )

    useEffect(() => {
        // 使用useEffect来监听键盘事件，esc键关闭弹窗
        const closeOnEscapeKey = e => e.key === "Escape" ? onClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [onClose]);

    // if (!open) return null;

    return (
        <ReactPortal>
            <CSSTransition
                in={open}
                timeout={{ entry: 200, exit: 0 }}
                unmountOnExit
                classNames="seal-modal-animation"
                nodeRef={nodeRef}
            >
                <div className={'seal-modal-root'} ref={nodeRef}>
                    {maskClosable && <div className="seal-modal-mask" onClick={onClose}/>}
                    <div className={wrapperClasses} style={{ width, ...style}}>
                        {showIcon && Icon}
                        <div className={'seal-modal-right'}>
                            <div className="seal-modal-header">
                                <div className="seal-modal-title">{title}</div>
                                {closeAble && CloseIcon}
                            </div>
                            <div className="seal-modal-content">{children}</div>
                            {FooterNode}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </ReactPortal>
    );
}

export default Modal;