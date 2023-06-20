import type * as React from 'react';

export function fillRef<T>(ref: React.Ref<T>, node: T) {
    if (typeof ref === 'function') {
        ref(node);
    } else if (typeof ref === 'object' && ref && 'current' in ref) {
        (ref as any).current = node;
    }
}

/**
 * Merge refs into one ref function to support ref passing.
 * 给传入的ref数组中的每个ref都赋值一个相同的元素
 * <RcInput
      ref={composeRef(ref, inputRef)}
 */
export function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
    const refList = refs.filter(ref => ref);
    if (refList.length <= 1) {
        return refList[0];
    }

    return (node: T) => {
        refs.forEach(ref => {
            fillRef(ref, node);
        });
    };
}
