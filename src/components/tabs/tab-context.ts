import React from 'react';
import { Tab } from './interface';

export interface TabContextProps {
    tabs: Tab[];
    prefixCls: string;
}

export const DefaultTabContextValue: TabContextProps = {
    tabs: [],
    prefixCls: ''
};

export const TabContext = React.createContext<TabContextProps>(DefaultTabContextValue);
