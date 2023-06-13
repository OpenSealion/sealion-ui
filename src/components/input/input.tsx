import React, { useState } from 'react';
import classNames from 'classnames';
import useMergedState from '../../hooks/useMergedState';

export interface InputProps extends React.HTMLAtributes<HTMLInputElement> {
    defaultValue?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    id?: string;
    className?: string; // 组件根元素的class
    inputWrapperClassName?: string; // 包裹input元素class
    inputClassName?: string; // input class
    prefixCls?: string; // class前缀
}

const Input = (
    {
        defaultValue,
        value,
        onChange,
        disabled = false,
        prepend,
        append,
        prefix,
        suffix,
        id,
        className,
        inputWrapperClassName,
        inputClassName,
        prefixCls = 'seal',
        ...rest
    }: InputProps,
    ref: React.Ref<HTMLInputElement>
) => {
    const [mergedValue, setMergedValue] = useMergedState<string>('', {
        value,
        defaultValue
    });

    const classes = classNames(className, `${prefixCls}-input-group`);
    const inputContainerClasses = classNames(
        `${prefixCls}-input-inner-container`,
        inputWrapperClassName,
        {
            [`${prefixCls}-input-inner-affix-container`]: prefix || suffix,
            [`${prefixCls}-input-inner-container-disabled`]: disabled
        }
    );

    const inputClasses = classNames(inputClassName, `${prefixCls}-inner-input`);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        setMergedValue(e.target.value);
    };

    return (
        <span
            id={id}
            className={classes}
        >
            {
                prepend
                    && (
                        <span className={`${prefixCls}-input-prepend`}>
                            { prepend }
                        </span>
                    )
            }
            <span className={inputContainerClasses}>
                {
                    prefix
                        && (
                            <span className={`${prefixCls}-input-prefix`}>
                                { prefix }
                            </span>
                        )
                }
                <input
                    className={inputClasses}
                    type="text"
                    ref={ref}
                    value={mergedValue}
                    onChange={handleChange}
                    disabled={disabled}
                    {...rest}
                />
                {
                    suffix
                        && (
                            <span className={`${prefixCls}-input-suffix`}>
                                { suffix }
                            </span>
                        )
                }
            </span>
            {
                append
                    && (
                        <span className={`${prefixCls}-input-append`}>
                            { append }
                        </span>
                    )
            }
        </span>
    );
};

const ForwardInput = React.forwardRef(Input);

export default ForwardInput;
