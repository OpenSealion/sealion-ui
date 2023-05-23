import React from 'react';
import classNames from 'classnames';
import SpaceItem from './space-item';

type SpaceSize = 'small' | 'middle' | 'large' | number;

export interface ISpaceProps extends React.HTMLAttributes<HTMLDivElement> {
    className: string; // 自定义类名
    style?: React.CSSProperties;
    size?: SpaceSize | [SpaceSize, SpaceSize];
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: React.ReactNode; // 用于自定义分隔符
    wrap?: boolean; // 是否换行
}

export const SpaceContext = React.createContext({
    latestIndex: 0,
    horizontalSize: 0,
    verticalSize: 0,
});
const spaceSize = {
    small: 8,
    middle: 16,
    large: 24,
};
function getNumberSize(size: SpaceSize) {
    return typeof size === 'string' ? spaceSize[size] : size || 0;
}
const Space: React.forwardRef<HTMLDivElement, ISpaceProps> = (props, ref) => {
    const {
        size = 'small',
        align,
        className,
        rootClassName,
        children,
        direction = 'horizontal',
        split,
        style,
        wrap = false,
        ...otherProps
    } = props;

    const prefix = 'seal-space';
    const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
    const wrapperClasses = classNames(
        `${prefix}-wrapper`,
        `${prefix}-${direction}`,
        `${prefix}-align-${mergedAlign}`,
        className,
        rootClassName,
    );
    const itemClasses = classNames(`${prefix}-item`);
    const [horizontalSize, verticalSize] = React.useMemo(
        () => ((Array.isArray(size)
            ? size
            : [size, size]) as [SpaceSize, SpaceSize])
            .map((item) => getNumberSize(item)),
        [size],
    );
    let latestIndex = 0;
    const itemNodes = React.Children.map(children, (child, index) => {
        if (child !== null && child !== undefined) {
            latestIndex = index;
        } else {
            return null;
        }
        const key = (child && child.key) || `${itemClasses}-${index}`;
        return (
            <SpaceItem
                className={itemClasses}
                direction={direction}
                index={index}
                split={split}
                wrap={wrap}
                key={key}
            >
                {child}
            </SpaceItem>
        );
    });
    const spaceContext = React.useMemo(
        () => ({
            horizontalSize, verticalSize, latestIndex
        }),
        [horizontalSize, verticalSize, latestIndex],
    );
    const gapStyle: React.CSSProperties = {
        gap: `${horizontalSize}px ${verticalSize}px`
    };
    if (wrap) {
        gapStyle.flexWrap = 'wrap';
    }
    return (
        <div
            // ref={ref}
            className={wrapperClasses}
            style={{
                ...gapStyle,
                ...style,
            }}
            {...otherProps}
        >
            <SpaceContext.Provider value={spaceContext}>
                {itemNodes}
            </SpaceContext.Provider>
        </div>
    );
};

export default Space;
