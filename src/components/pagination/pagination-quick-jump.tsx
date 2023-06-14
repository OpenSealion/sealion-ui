import React, { useState } from 'react';
import classNames from 'classnames';
import { PaginationSizes } from './pagination';
import Input from '../input';

export interface PaginationQuickJumpProps {
    size?: PaginationSizes,
    disabled?: boolean,
    onJumpPage: (value) => void
}

const keyCodes = {
    ENTER: 13
};

const vaildValue = (value) => {
    return value && /[0-9]+/.test(value);
};

const PaginationQuickJump:React.FC<PaginationQuickJumpProps> = (props) => {
    const {
        size,
        disabled,
        onJumpPage,
    } = props;
    const [value, setValue] = useState<string>('');

    const quickJumpClasses = classNames(
        'seal-pagination-quick-jump',
        !!size && `seal-pagination-quick-jump-${size}`,
        disabled && 'seal-pagination-disable'
    );

    const quickJumpInputClasses = classNames(
        'seal-pagination-quick-jump-input',
        !!size && `seal-pagination-quick-jump-input-${size}`
    );

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleKeyUp = (e) => {
        if (!value) {
            return;
        }
        if (e.keyCode === keyCodes.ENTER) {
            if (vaildValue(value)) {
                onJumpPage(Number(value));
            }
            setValue('');
        }
    };

    const handleBlur = () => {
        if (!value) {
            return;
        }
        if (vaildValue(value)) {
            onJumpPage(Number(value));
        }
        setValue('');
    };

    return (
        <li className={quickJumpClasses}>
            跳至
            <Input
                className={quickJumpInputClasses}
                inputWrapperClassName="seal-pagination-quick-jump-input-wrapper"
                disabled={disabled}
                value={value}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
            />
            页
        </li>
    );
};
export default PaginationQuickJump;
