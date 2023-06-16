import React from 'react';
import { ConfigContext } from '../../provider/context';
import { deleteKeys } from '../../utils';
import { LocaleProps } from '../../locales';

export interface ConfigProviderProps {
    children?: React.ReactNode,
    locale?: LocaleProps
}

const ConfigProvider:React.FC<ConfigProviderProps> = (props) => {
    const {
        children,
        locale
    } = props;
    const config = deleteKeys(props, ['children']);

    return (
        <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
    );
};
export default ConfigProvider;
