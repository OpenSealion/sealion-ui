import React from 'react';
import classNames from 'classnames';
import { StepsContext } from './steps';
import IconFont from '../icon/icon';

export interface StepItemProps extends React.HTMLAttributes<HTMLDivElement>{
    index: number;
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    icon?: React.ReactNode;
    status?: 'wait' | 'process' | 'finish' | 'error';
    disabled?: boolean;
    subTitle?: string;
}

const StepItem: React.FC<StepItemProps> = (props) => {
    const {
        title, description, icon, status, disabled, subTitle, index
    } = props;

    const {
        currentIndex, initial, size, direction, labelPlacement, progressDot, onChange
    } = React.useContext(StepsContext);

    // 水平方向下，label垂直才有意义; 垂直方向下，label只能水平
    const _labelPlacement = direction === 'horizontal' ? labelPlacement : 'horizontal';

    const currentStatus = () => {
        if (status) {
            return status;
        } if (currentIndex === index) {
            return 'process';
        } if (currentIndex > index) {
            return 'finish';
        }
        return 'wait';
    };

    const itemClassName = classNames('seal-step-item', `seal-step-item-${currentStatus()}`, `seal-step-label-${_labelPlacement}`);
    const itemIcon = () => {
        if (icon) {
            return icon;
        } if (currentStatus() === 'finish') {
            return <IconFont icon="icon-CorrectOutlined" />;
        } if (currentStatus() === 'error') {
            return <IconFont icon="icon-cuowu1" />;
        }
        return index + 1 + initial;
    };

    return (
        // 如果传了onChange，item变成可点击的
        <div
            className={itemClassName}
            role={onChange ? 'button' : undefined}
            onClick={() => {
                if (onChange && !disabled) {
                    onChange(index);
                }
            }}
        >
            <div className="seal-step-item-tail" />
            <div className="seal-step-item-icon">{itemIcon()}</div>
            <div className="seal-step-item-content">
                <div className="seal-step-item-title">
                    {title}
                    {subTitle && <span className="seal-step-item-subtitle">{subTitle}</span>}
                </div>
                {description && <div className="seal-step-item-description">{description}</div>}
            </div>
        </div>
    );
};

export default StepItem;
