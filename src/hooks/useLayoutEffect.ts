import * as React from 'react';

export function canUseDom() {
    return !!(
        typeof window !== 'undefined'
      && window.document
      && window.document.createElement
    );
}

type VoidFunction = () => void;

/**
 * 这个判断主要是为测试环境服务的，测试阶段由于没有真实dom环境，所以使用useLayoutEffect是会报警告
 */
const useInternalLayoutEffect = process.env.NODE_ENV !== 'test' && canUseDom()
    ? React.useLayoutEffect
    : React.useEffect;

const useLayoutEffect = (
    callback: (mount: boolean) => void | VoidFunction,
    deps?: React.DependencyList,
) => {
    const firstMountRef = React.useRef(true);

    useInternalLayoutEffect(() => {
        return callback(firstMountRef.current);
    }, deps);

    // We tell react that first mount has passed
    useInternalLayoutEffect(() => {
        firstMountRef.current = false;
        return () => {
            firstMountRef.current = true;
        };
    }, []);
};

export const useLayoutUpdateEffect: typeof React.useEffect = (
    callback,
    deps,
) => {
    useLayoutEffect(firstMount => {
        if (!firstMount) {
            return callback();
        }
        return undefined;
    }, deps);
};

export default useLayoutEffect;
