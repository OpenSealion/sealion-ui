import { useState, useEffect, useRef } from 'react';
import { addMouseWheelEvent } from '../utils';

const useMounseWheel = (tabList) => {
    const [position, setPosition] = useState({ x: 0 });
    const [isExpandContainer, setIsExpandContainer] = useState(false);
    const rightScrollBoundry = useRef(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleMounseWheel = (e) => {
            e.preventDefault();

            console.log(rightScrollBoundry.current);
            const diffX = e.delta * 30;
            setPosition((prevPosition) => {
                let x = prevPosition.x - diffX;
                if (x > 0) {
                    x = 0;
                } else if (x < rightScrollBoundry.current) {
                    x = rightScrollBoundry.current;
                }

                return {
                    x,
                    y: prevPosition.y
                };
            });
        };

        let cancelMouseWheelEvent = null;

        const mountScrollEvent = () => {
            if (scrollRef.current) {
                const scrollWidth = scrollRef.current.clientWidth;
                const scrollParentWidth = scrollRef.current.parentNode.clientWidth;

                if (scrollWidth >= scrollParentWidth) {
                    // 当滚动内容超出可视区域时支持滚动
                    rightScrollBoundry.current = scrollParentWidth - scrollWidth; // 是个负数
                    cancelMouseWheelEvent = addMouseWheelEvent(scrollRef.current, 'mousewheel', handleMounseWheel, false);
                }
                setIsExpandContainer(scrollParentWidth < scrollWidth + 200);
            }
        };

        mountScrollEvent();

        return () => {
            if (typeof cancelMouseWheelEvent === 'function') {
                cancelMouseWheelEvent();
            }
        };
    }, [position, tabList]);

    return [position, scrollRef, isExpandContainer];
};

export default useMounseWheel;
