import React from 'react';
import { SpaceContext } from './space';

interface ISpaceItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className: string;
    children: React.ReactNode;
    index: number;
    direction?: 'horizontal' | 'vertical';
    split?: React.ReactNode;
    wrap?: boolean;
}
const SpaceItem: React.FC<ISpaceItemProps> = ({
    className,
    direction,
    index,
    children,
    split,
    wrap
}) => {
    const { horizontalSize, verticalSize, latestIndex } = React.useContext(SpaceContext);
    const style: React.CSSProperties = {};
    // if (direction === 'horizontal' && wrap) {
    //     style.paddingBottom = verticalSize;
    // }
    return (
        <>
            <div className={className} style={style}>
                {children}
            </div>
            {index < latestIndex && split && (
                <span className={`${className}-split`} style={style}>
                    {split}
                </span>
            )}
        </>
    );
};

export default SpaceItem;
