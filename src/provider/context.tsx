// gloabl config
import React, { createContext } from 'react';
import { LocaleProps } from '../locales';
import defaultLocaleValue from '../locales/zh-CN';

export interface ConfigContextProps {
    locale?: LocaleProps
}

export const ConfigContext = createContext<ConfigContextProps>({
    locale: defaultLocaleValue
});
