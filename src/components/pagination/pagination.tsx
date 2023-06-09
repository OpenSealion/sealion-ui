import React, { CSSProperties } from 'react';
import classNames from 'classnames';

export interface PaginationProps {
    className?: string,
    style?: CSSProperties
}

const Pagination:React.FC<PaginationProps> = (props) => {
    const {
        className,
        style,
        ...rest
    } = props;
    const paginationClasses = classNames(
        className,
        'seal-pagination'
    );

    return (
        <ul
            className={paginationClasses}
            style={style}
            {...rest}
        >
            1
        </ul>
    );
};
export default Pagination;
