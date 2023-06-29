import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export default function useEvent<T extends Function>(callback: T): T {
    const fnRef = React.useRef<any>();
    fnRef.current = callback;

    const memoFn = React.useCallback(
    ((...args: any) => fnRef.current?.(...args)) as any,
    [],
    );

    return memoFn;
}
