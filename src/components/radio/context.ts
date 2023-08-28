import React from 'react';

export interface RadioGroupContextProps {
    onChange: (e) => void;
    value: any;
    disabled?: boolean;
    name?: string;
}

export const RadioGroupContext = React.createContext<RadioGroupContextProps | null>(null);
export const RadioGroupContextProvider = RadioGroupContext.Provider;
