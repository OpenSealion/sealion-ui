import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useMounseWheel } from '../../hooks';

export interface TabsProps {
    className?: string;
    nearExtra?: boolean;
}

const getMoveStyle = ({ x = 0, y = 0 }) => {
    return {
        transform: `translate(${x}px, ${y}px)`
    };
};

const Tabs: React.FC<TabsProps> = ({
    className
}) => {
    const extraRef = useRef(null);
    const [tabList, setTabList] = useState([]);
    const [position, scrollRef, isExpandContainer] = useMounseWheel(tabList);
    const classes = classNames(className, 'seal-tabs');
    const tabsContainerClasses = classNames('seal-tabs-container', isExpandContainer && 'seal-tabs-near-extra');

    const handleAddClick = () => {
        setTabList([...tabList, {}]);
    };

    return (
        <div className={classes}>
            <div className="seal-tabs-nav">
                <div
                    className={tabsContainerClasses}
                >
                    <div
                        className="seal-tabs-list"
                        ref={scrollRef}
                        style={getMoveStyle(position)}
                    >
                        {
                            tabList.map((_, i) => (
                                <div key={i} className="seal-tabs-tab">
                                    模型名称
                                    {i}
                                </div>
                            ))
                        }
                        {
                            !isExpandContainer && (<div className="seal-tabs-extra-content" onClick={handleAddClick}>新增</div>)
                        }
                    </div>
                </div>
                {
                    isExpandContainer
                        && (
                            <div
                                ref={extraRef}
                                className="seal-tabs-extra-content"
                                onClick={handleAddClick}
                            >
                                新增
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default Tabs;
