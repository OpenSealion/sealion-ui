import React from 'react';
import classNames from 'classnames';

export interface PaginationJumpProps {
    children?: React.ReactNode,
    className?: string
}

const PaginationJump:React.FC<PaginationJumpProps> = (props) => {
    const {
        children,
        className
    } = props;
    const itemClasses = classNames(
        className,
        'seal-pagination-jump',
        'seal-pagination-jump-disable'
    );

    return (
        <li
            // onClick={this.prev}
            // tabIndex={prevDisabled ? null : 0}
            // onKeyPress={this.runIfEnterPrev}
            className={itemClasses}
            // aria-disabled={prevDisabled}
        >
            {children}
        </li>
    );
};
export default PaginationJump;
