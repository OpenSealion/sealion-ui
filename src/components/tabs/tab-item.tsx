import React, { useRef } from 'react';
import Button from '../button';

const TabItem = ({
    children
}) => {
    const itemRef = useRef(null);

    return (
        <div
            className="seal-tab-item"
            ref={itemRef}
        >
            <Button>{children}</Button>
        </div>
    );
};

export default TabItem;
