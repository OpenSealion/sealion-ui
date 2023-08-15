import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

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
    disabled?: boolean,
    onChange?: (e) => void,
    onBlur?: (e) => void,
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
    onChange,
    onBlur,
    reg = /.*/,
    validateMessage,
    textarea = false,
    disabled = false,
    rows = 2,
    ...rest
}) => {
    const [_value, setValue] = useState(value);
    const [errorClass, setErrorClass] = useState('');
    const inputWrapperClasses = classNames('seal-input-wrapper', (type === 'disable' || disabled) && 'seal-input-wrapper-disable', errorClass);
    const inputClasses = classNames('seal-input', (type === 'disable' || disabled) && 'seal-input-disable');
    const textareaClasses = classNames('seal-input-textarea', (type === 'disable' || disabled) && 'seal-input-disable');
    const handleValidate = (e) => {
        if (!new RegExp(reg).test(e.target.value) && e.target.value) {
            setErrorClass('seal-input-error');
        } else {
            setErrorClass('');
        }
    };
    const handleChange = (e) => {
        if (onChange) {
            // 有onChange函数传入，在change时执行校验规则
            handleValidate(e);
            if (value.length < maxLength || (value.length === maxLength && e.target.value.length < maxLength)) {
                onChange(e.target.value);
                setValue(e.target.value);
            }
            if (e.target.value.length > maxLength) {
                onChange(e.target.value.slice(0, maxLength));
                setValue(e.target.value.slice(0, maxLength));
            }
        } else {
            // chang函数默认行为
            if (value.length < maxLength || (value.length === maxLength && e.target.value.length < maxLength)) {
                setValue(e.target.value);
            }
            if (e.target.value.length > maxLength) {
                setValue(e.target.value.slice(0, maxLength));
            }
        }
    };
    const handleBlur = (e) => {
        if (onBlur) {
            // 有onBlur函数传入，在blur时执行校验规则
            handleValidate(e);
            if (value.length < maxLength || (value.length === maxLength && e.target.value.length < maxLength)) {
                onBlur(e.target.value);
            }
            if (e.target.value.length > maxLength) {
                onBlur(e.target.value.slice(0, maxLength));
            }
        }
    };

    useEffect(() => {
        setValue(value);
    }, [value]);

    return (
        <div style={style} className={classNames(className, 'seal-input-container')}>
            <div className={inputWrapperClasses}>
                {textarea ? (
                    <>
                        <textarea
                            value={_value}
                            disabled={type === 'disable' || disabled}
                            className={textareaClasses}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={rows}
                            {...rest}
                        />
                        {showCount && (
                            <span className="seal-input-count-textarea">
                                {`${_value.length} / ${maxLength}`}
                            </span>
                        )}
                    </>

                ) : (
                    <>
                        <input
                            value={_value}
                            disabled={type === 'disable' || disabled}
                            className={inputClasses}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            {...rest}
                        />
                        {showCount && (
                            <span className="seal-input-count">
                                {`${_value.length} / ${maxLength}`}
                            </span>
                        )}
                    </>
                )}
            </div>
            <div className="seal-input-error-desc">{errorClass ? validateMessage : ''}</div>
        </div>
    );
};
export default CountInput;
