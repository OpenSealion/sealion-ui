import classNames from 'classnames';
import React, { useState } from 'react';

export interface ICountInput {
    type?: string;
    defaultValue?: string;
    value?: string;
    maxLength?: number;
    showCount?: boolean;
    className?: string;
    style?: React.CSSProperties;
    reg?: RegExp,
    textarea?: boolean,
    rows?: number,
    validateMessage?: string,
    onChange?: (e) => void,
    [key: string]: any
}

const CountInput: React.FC<ICountInput> = ({
    type = 'primary',
    showCount = false,
    defaultValue = '',
    maxLength = 9999,
    value = defaultValue,
    style,
    className,
    onChange = (value) => null,
    reg = /.*/,
    validateMessage,
    textarea = false,
    rows = 2,
    ...rest
}) => {
    const [errorClass, setErrorClass] = useState('');
    const inputClasses = classNames('seal-input', type === 'disable' && 'seal-input-disable', errorClass);
    const handleChange = (e) => {
        if (!new RegExp(reg).test(e.target.value) && e.target.value) {
            setErrorClass('seal-input-error');
        } else {
            setErrorClass('');
        }
        if (value.length < maxLength || (value.length === maxLength && e.target.value.length < maxLength)) {
            onChange(e.target.value);
        }
        if (e.target.value.length > maxLength) {
            onChange(e.target.value.slice(0, maxLength));
        }
    };
    return (
        <div style={style} className={classNames(className, 'seal-input-container')}>
            {textarea ? (
                <textarea
                    value={value}
                    disabled={type === 'disable'}
                    className={inputClasses}
                    onChange={handleChange}
                    rows={rows}
                    {...rest}
                />
            ) : (
                <input
                    value={value}
                    disabled={type === 'disable'}
                    className={inputClasses}
                    onChange={handleChange}
                    {...rest}
                />
            )}
            {showCount && (
                <span className="seal-input-count">
                    {value.length}
                    {' '}
                    /
                    {' '}
                    {maxLength}
                </span>
            )}
            <div className="seal-input-error-desc">{errorClass ? validateMessage : ''}</div>
        </div>
    );
};
export default CountInput;
