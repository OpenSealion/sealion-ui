import React from 'react';
import BaseInput, { BaseInputProps, InputRef } from './input';

export type InputProps = BaseInputProps;

type MergedComponent = React.ForwardRefExoticComponent<InputProps | React.RefAttributes<InputRef>>;

const Input = BaseInput as MergedComponent;

export default Input;
