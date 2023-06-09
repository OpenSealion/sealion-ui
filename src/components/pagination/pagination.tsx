import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import PaginationJump from './pagination-jump';

export interface PaginationProps {
    className?: string,
    style?: CSSProperties,
    itemRender?: (page: number, type: 'page' | 'prev' | 'next', originalElement: React.ReactNode) => React.ReactNode
}

const Pagination:React.FC<PaginationProps> = (props) => {
    const {
        className,
        style,
        itemRender,
        ...rest
    } = props;
    const prefixCls = 'seal-pagination';
    const paginationClasses = classNames(
        className,
        prefixCls
    );
    const preClasses = classNames(
        `${prefixCls}-prev`
    );

    return (
        <ul
            className={paginationClasses}
            style={style}
            {...rest}
        >
            <PaginationJump
                className={preClasses}
            >
                <Icon icon="icon-fanhui" />
            </PaginationJump>
            <PaginationJump
                className={preClasses}
            >
                <Icon icon="icon-qianwang" />
            </PaginationJump>
        </ul>
    );
};
export default Pagination;
