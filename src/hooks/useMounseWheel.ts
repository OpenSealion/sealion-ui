import { useState, useEffect, useRef } from 'react';
import { addMouseWheelEvent } from '../utils';
import { TabItemObjProps } from '@/components/tabs/tabs';

export enum DirectionEnums {
    hoz = 1,
    ver = 2
}

export interface MouseWheelProps {
    tabExtraGap: number;
    direction: DirectionEnums;
}

const DefaultProps = {
    tabExtraGap: 10,
    direction: DirectionEnums.hoz
};
const DefaultPosition = {
    x: 0,
    y: 0
};

const useMounseWheel = (tabList: TabItemObjProps[], props: MouseWheelProps = { ...DefaultProps }) => {
    const [position, setPosition] = useState<{x: number, y: number}>(DefaultPosition);
    const [isExpandContainer, setIsExpandContainer] = useState(false);
    const rightScrollBoundry = useRef(0);
    const scrollRef = useRef(null);
    const { tabExtraGap, direction } = props;

    useEffect(() => {
        const handleMounseWheel = (e: { preventDefault: () => void; delta: number; }) => {
            e.preventDefault();

            const diffX = e.delta * 30;
            const diffY = e.delta * 30;
            setPosition((prevPosition) => {
                let x = prevPosition.x - diffX;
                if (x > 0) {
                    x = 0;
                } else if (x < rightScrollBoundry.current) {
                    x = rightScrollBoundry.current;
                }

                const y = prevPosition.y - diffY;
                if (y > 0) {
                    // todo
                }

                const p = direction === DirectionEnums.hoz ? { x, y: 0 } : { x: 0, y };

                return { x: 0, y: 0 };
            });
        };

        let cancelMouseWheelEvent: () => void = null;

        const mountScrollEvent = () => {
            if (scrollRef.current) {
                const scrollWidth = scrollRef.current.clientWidth;
                const scrollParentWidth = scrollRef.current.parentNode.clientWidth;

                if (scrollWidth >= scrollParentWidth) {
                    // 当滚动内容超出可视区域时支持滚动
                    rightScrollBoundry.current = scrollParentWidth - scrollWidth; // 是个负数
                    cancelMouseWheelEvent = addMouseWheelEvent(scrollRef.current, 'mousewheel', handleMounseWheel, { passive: false });
                }
                setIsExpandContainer(scrollParentWidth < scrollWidth + tabExtraGap);
            }
        };

        mountScrollEvent();

        return () => {
            if (typeof cancelMouseWheelEvent === 'function') {
                cancelMouseWheelEvent();
            }
        };
    }, [position, tabList]);

    return { position, scrollRef, isExpandContainer };
};

export default useMounseWheel;
