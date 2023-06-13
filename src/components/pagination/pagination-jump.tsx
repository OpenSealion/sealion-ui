/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import classNames from 'classnames';
import { PaginationSizes } from './pagination';

export interface PaginationJumpProps {
    children?: React.ReactNode,
    className?: string,
    disabled?: boolean,
    onClick: () => void,
    size?: PaginationSizes
}

const PaginationJump:React.FC<PaginationJumpProps> = (props) => {
    const {
        children,
        className,
        disabled,
        onClick,
        size
    } = props;
    const itemClasses = classNames(
        className,
        'seal-pagination-jump',
        !!size && `seal-pagination-jump-${size}`,
        disabled && 'seal-pagination-disable'
    );

    return (
        <li
            onClick={onClick}
            tabIndex={disabled ? null : 0}
            className={itemClasses}
        >
            {children}
        </li>
    );
};
export default PaginationJump;
