/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import classNames from 'classnames';

export interface PaginationItemProps {
    className?: string,
    disabled?: boolean,
    page?: number,
    active?: boolean,
    itemRender?: (
        page?: number,
        type?: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
        originalElement?: React.ReactNode
    ) => React.ReactNode,
    onClick?: () => void
}

const PaginationItem:React.FC<PaginationItemProps> = (props) => {
    const {
        className,
        disabled,
        page,
        active,
        itemRender,
        onClick
    } = props;
    const itemClasses = classNames(
        className,
        'seal-pagination-item',
        active && 'seal-pagination-item-active',
        disabled && 'seal-pagination-disable'
    );

    return (
        <li
            tabIndex={0}
            className={itemClasses}
            onClick={onClick}
            // onKeyPress={this.runIfEnterPrev}
        >
            {itemRender(page, 'page', <a rel="nofollow">{page}</a>)}
        </li>
    );
};
export default PaginationItem;
