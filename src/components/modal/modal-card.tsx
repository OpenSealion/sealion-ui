import React, { useEffect } from 'react';
import classNames from 'classnames';
import IconFont from '../icon';
import Button from '../button/button';
import { IModalProps } from '@/components/modal/modal';

const ModalCard: React.FC<IModalProps> = (props) => {
    const {
        children,
        title,
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
        loading = false,
        loadingIcon,
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
                disabled={loading}
                onClick={() => {
                    onOk();
                    onClose();
                }}
            >
                {
                    loading
                        ? (
                            <>
                                {loadingIcon || (
                                    <IconFont
                                        icon="icon-RefreshOutlined"
                                        className="spin"
                                    />
                                )}
                                {okText || '确认'}
                            </>
                        ) : (okText || '确认')
                }
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
