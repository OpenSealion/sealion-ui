/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import classNames from 'classnames';

export interface PaginationJumpProps {
    children?: React.ReactNode,
    className?: string,
    disabled?: boolean,
}

const PaginationJump:React.FC<PaginationJumpProps> = (props) => {
    const {
        children,
        className,
        disabled
    } = props;
    const itemClasses = classNames(
        className,
        'seal-pagination-jump',
        disabled && 'seal-pagination-disable'
    );

    return (
        <li
            // onClick={this.prev}
            tabIndex={disabled ? null : 0}
            // onKeyPress={this.runIfEnterPrev}
            className={itemClasses}
            // aria-disabled={disabled}
        >
            {children}
        </li>
    );
};
export default PaginationJump;
