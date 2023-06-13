/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, {
    cloneElement, CSSProperties, useEffect, useState
} from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import PaginationJump from './pagination-jump';
import PaginationItem from './pagination-item';

export interface PaginationProps {
    className?: string,
    style?: CSSProperties,
    itemRender?: (
        page: number,
        type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
        originalElement: React.ReactNode
    ) => React.ReactNode,
    current?: number,
    pageSize?: number,
    total?: number,
    defaultCurrent?: number,
    defaultPageSize?: number
}

const Pagination:React.FC<PaginationProps> = (props) => {
    const {
        className,
        style,
        itemRender = (
            page,
            type,
            element,
        ) => {
            return element;
        },
        current,
        pageSize,
        total = 0,
        defaultCurrent = 1,
        defaultPageSize = 10,
        ...rest
    } = props;
    const [currentPage, setCurrentPage] = useState<number>(current || defaultCurrent);
    const [currentPageSize, setCurrentPageSize] = useState<number>(pageSize || defaultPageSize);
    const pageItem = [];
    let jumpPrevItem;
    let jumpNextItem;
    let firstItem;
    let lastItem;
    const showItems = 5;
    const prefixCls = 'seal-pagination';
    const paginationClasses = classNames(
        className,
        prefixCls
    );
    const preClasses = classNames(
        `${prefixCls}-prev`
    );
    const nextClasses = classNames(
        `${prefixCls}-next`
    );
    const calculatePage = (data?: {
        p?: number
    }) => {
        const psize = data?.p || currentPageSize;
        return Math.floor((total - 1) / psize) + 1;
    };
    const allPages = calculatePage();
    const hasPrev = () => currentPage > 1;
    const hasNext = () => currentPage < allPages;
    const prevDisabled = !hasPrev() || !allPages;
    const nextDisabled = !hasNext() || !allPages;
    const getJumpPrevPage = () => Math.max(1, currentPage - showItems);
    const getJumpNextPage = () => Math.min(calculatePage(), currentPage + showItems);

    if (allPages <= 7) {
        const paramItem = {
            // locale,
            // onClick,
            // onKeyPress,
            itemRender
        };
        if (!allPages) {
            <PaginationItem
                {...paramItem}
                key="noPrev"
                page={1}
                className={`${prefixCls}-disabled`}
            />;
        }
        for (let i = 1; i <= allPages; i += 1) {
            const active = currentPage === i;
            pageItem.push(
                <PaginationItem
                    {...paramItem}
                    key={i}
                    page={i}
                    active={active}
                />
            );
        }
    } else {
        jumpPrevItem = (
            <li
                title="向前5页"
                key="jumpPrev"
                // onClick={this.jumpPrev}
                tabIndex={0}
                // onKeyPress={this.runIfEnterJumpPrev}
                className={`${prefixCls}-prev-five`}
            >
                {itemRender(
                    getJumpPrevPage(),
                    'jump-prev',
                    <span>···</span>
                )}
            </li>
        );
        jumpNextItem = (
            <li
                title="向后5页"
                key="jumpNext"
                tabIndex={0}
                // onClick={jumpNext}
                // onKeyPress={this.runIfEnterJumpNext}
                className={`${prefixCls}-next-five`}
            >
                {itemRender(
                    getJumpNextPage(),
                    'jump-next',
                    <span>···</span>
                )}
            </li>
        );
        firstItem = (
            <PaginationItem
                // locale={locale}
                // onClick={handleChange}
                // onKeyPress={runIfEnter}
                key={1}
                page={1}
                active={false}
                itemRender={itemRender}
            />
        );
        lastItem = (
            <PaginationItem
                // locale={locale}
                // onClick={handleChange}
                // onKeyPress={runIfEnter}
                key={allPages}
                page={allPages}
                active={false}
                itemRender={itemRender}
            />
        );
        let left = Math.max(1, currentPage - 2);
        let right = Math.min(currentPage + 2, allPages);

        if (currentPage - 1 <= 2) {
            right = 5;
        }

        if (allPages - currentPage <= 2) {
            left = allPages - 4;
        }

        for (let i = left; i <= right; i += 1) {
            const active = currentPage === i;
            pageItem.push(
                <PaginationItem
                    // locale={locale}
                    // onClick={handleChange}
                    // onKeyPress={runIfEnter}
                    key={i}
                    page={i}
                    active={active}
                    itemRender={itemRender}
                />
            );
        }

        if (currentPage - 1 >= 4 && currentPage !== 3) {
            pageItem[0] = cloneElement(pageItem[0], {
                // className: `${prefixCls}-item-after-jump-prev`,
            });
            pageItem.unshift(jumpPrevItem);
        }

        if (
            allPages - currentPage >= 4 && currentPage !== allPages - 2
        ) {
            pageItem[pageItem.length - 1] = cloneElement(
                pageItem[pageItem.length - 1],
                {
                    // className: `${prefixCls}-item-before-jump-next`
                },
            );
            pageItem.push(jumpNextItem);
        }

        if (left !== 1) {
            pageItem.unshift(firstItem);
        }

        if (right !== allPages) {
            pageItem.push(lastItem);
        }
    }

    useEffect(() => {
        current && setCurrentPage(current);
    }, [current]);

    useEffect(() => {
        pageSize && setCurrentPageSize(pageSize);
    }, [pageSize]);

    return (
        <ul
            className={paginationClasses}
            style={style}
            {...rest}
        >
            <PaginationJump
                className={preClasses}
                disabled={prevDisabled}
            >
                <Icon icon="icon-fanhui" fontSize="12px" />
            </PaginationJump>
            {pageItem}
            <PaginationJump
                className={nextClasses}
                disabled={nextDisabled}
            >
                <Icon icon="icon-qianwang" fontSize="12px" />
            </PaginationJump>
        </ul>
    );
};
export default Pagination;
