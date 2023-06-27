import React, { useState } from 'react';
import classNames from 'classnames';

const Select = ({
    prefixCls = 'seal'
}) => {
    const classes = classNames(`${prefixCls}-select`, {

    });

    return (
        <div>
            <input type="text" />
        </div>
    );
};

export default Select;
