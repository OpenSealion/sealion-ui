import React, { ReactNode } from 'react';
import classNames from 'classnames';
import SingleRadio from './radio';
import { RadioGroupContextProvider } from './context';

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
    options: string[] | number[] | Array<{ label: ReactNode; value: string; disabled?: boolean; }>,
    direction?: 'vertical' | 'horizontal',
    defaultValue?: any,
    value?: any,
    onChange?: (e: Event) => void,
    disabled?: boolean,
    name?: string
}

const RadioGroup: React.FC<RadioGroupProps> = (props) => {
    const {
        options,
        direction = 'horizontal',
        defaultValue,
        value,
        onChange,
        disabled,
        name
    } = props;
    const currentValue = value || defaultValue;
    const groupClasses = classNames(
        'seal-radio-group',
        direction === 'horizontal' && 'seal-radio-group-horizontal',
        direction === 'vertical' && 'seal-radio-group-vertical'
    );

    const onChangeGroup = (e) => {
        onChange?.(e);
    };

    const childrenRender = options?.map(option => {
        if (typeof option === 'string' || typeof option === 'number') {
            return (
                <SingleRadio
                    key={option.toString()}
                    disabled={disabled}
                    value={option}
                    checked={currentValue === option}
                >
                    {option}
                </SingleRadio>
            );
        }
        return (
            <SingleRadio
                key={option.value}
                disabled={option.disabled || disabled}
                value={option.value}
                checked={currentValue === option.value}
            >
                {option.label}
            </SingleRadio>
        );
    });

    return (
        <div className={groupClasses}>
            <RadioGroupContextProvider
                value={{
                    onChange: onChangeGroup,
                    value: currentValue,
                    disabled,
                    name
                }}
            >
                {childrenRender}
            </RadioGroupContextProvider>
        </div>
    );
};
export default RadioGroup;
