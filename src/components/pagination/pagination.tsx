/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, {
    cloneElement, CSSProperties, isValidElement, useContext, useEffect, useState
} from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import PaginationJump from './pagination-jump';
import PaginationItem from './pagination-item';
import PaginationQuickJump from './pagination-quick-jump';
import { ConfigContext } from '../../provider/context';

export type PaginationSizes = 'small' | 'normal';
export interface PaginationProps {
    className?: string,
    style?: CSSProperties,
    itemRender?: (
        page?: number,
        type?: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
        originalElement?: React.ReactNode
    ) => React.ReactNode,
    current?: number,
    pageSize?: number,
    total?: number,
    defaultCurrent?: number,
    defaultPageSize?: number,
    onChange?: (page, pageSize) => void,
    disabled?: boolean,
    showTotal?: boolean,
    hideOnSinglePage?: boolean,
    size?: PaginationSizes,
    bufferSize?: number,
    showQuickJump?: boolean
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
        onChange,
        disabled = false,
        showTotal = false,
        hideOnSinglePage = false,
        size = 'normal',
        bufferSize = 2,
        showQuickJump = false,
        ...rest
    } = props;
    const { locale } = useContext(ConfigContext);
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
    const totalInfo = showTotal && (
        <li
            className={classNames(
                `${prefixCls}-total-info`,
                !!size && `${prefixCls}-total-info-${size}`
            )}
        >
            {`共 ${total || 0} 条`}
        </li>
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
    const handleChangeCurrent = (page: number) => {
        if (page !== currentPage && !disabled) {
            let newPage = page;
            if (page > allPages) {
                newPage = allPages;
            } else if (page < 1) {
                newPage = 1;
            }
            setCurrentPage(newPage);
            if (onChange) {
                onChange(newPage, currentPageSize);
            }
            return newPage;
        }
        return currentPage;
    };
    const jumpPrev = () => {
        if (hasPrev) {
            handleChangeCurrent(currentPage - 1);
        }
    };
    const jumpNext = () => {
        if (hasNext) {
            handleChangeCurrent(currentPage + 1);
        }
    };
    const jumpPrevFive = () => {
        handleChangeCurrent(getJumpPrevPage());
    };
    const jumpNextFive = () => {
        handleChangeCurrent(getJumpNextPage());
    };

    if (allPages <= 3 + bufferSize * 2) {
        const paramItem = {
            itemRender,
            disabled,
            size
        };
        if (!allPages) {
            <PaginationItem
                {...paramItem}
                key="noPrev"
                page={1}
                className={`${prefixCls}-disabled`}
                onClick={() => { handleChangeCurrent(1) }}
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
                    onClick={() => { handleChangeCurrent(i) }}
                />
            );
        }
    } else {
        jumpPrevItem = (
            <li
                title={locale?.pagination?.jump_prev_five}
                key="jumpPrev"
                onClick={jumpPrevFive}
                tabIndex={0}
                className={classNames(
                    `${prefixCls}-prev-five`,
                    !!size && `${prefixCls}-prev-five-${size}`,
                    disabled && 'seal-pagination-disable'
                )}
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
                title={locale?.pagination?.jump_next_five}
                key="jumpNext"
                tabIndex={0}
                onClick={jumpNextFive}
                className={classNames(
                    `${prefixCls}-next-five`,
                    !!size && `${prefixCls}-next-five-${size}`,
                    disabled && 'seal-pagination-disable'
                )}
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
                onClick={() => { handleChangeCurrent(1) }}
                key={1}
                page={1}
                active={false}
                itemRender={itemRender}
                disabled={disabled}
                size={size}
            />
        );
        lastItem = (
            <PaginationItem
                onClick={() => { handleChangeCurrent(allPages) }}
                key={allPages}
                page={allPages}
                active={false}
                itemRender={itemRender}
                disabled={disabled}
                size={size}
            />
        );
        let left = Math.max(1, currentPage - bufferSize);
        let right = Math.min(currentPage + bufferSize, allPages);

        if (currentPage - 1 <= bufferSize) {
            right = bufferSize * 2 + 1;
        }

        if (allPages - currentPage <= bufferSize) {
            left = allPages - bufferSize * 2;
        }

        for (let i = left; i <= right; i += 1) {
            const active = currentPage === i;
            pageItem.push(
                <PaginationItem
                    onClick={() => { handleChangeCurrent(i) }}
                    key={i}
                    page={i}
                    active={active}
                    itemRender={itemRender}
                    disabled={disabled}
                    size={size}
                />
            );
        }

        if (currentPage - 1 >= bufferSize * 2 && currentPage !== 3) {
            pageItem.unshift(jumpPrevItem);
        }

        if (allPages - currentPage >= bufferSize * 2 && currentPage !== allPages - 2) {
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

    if (hideOnSinglePage && total <= currentPageSize) {
        return null;
    }

    const prevRender = (page: number) => {
        const prevItem = itemRender(
            page,
            'prev',
            <Icon icon="icon-fanhui" fontSize="12px" />
        );
        return isValidElement(prevItem) ? cloneElement(prevItem, { disabled: !hasPrev() }) : prevItem;
    };

    const nextRender = (page: number) => {
        const nextItem = itemRender(
            page,
            'next',
            <Icon icon="icon-qianwang" fontSize="12px" />
        );
        return isValidElement(nextItem) ? cloneElement(nextItem, { disabled: !hasNext() }) : nextItem;
    };

    return (
        <ul
            className={paginationClasses}
            style={style}
            {...rest}
        >
            {totalInfo}
            <PaginationJump
                className={preClasses}
                disabled={prevDisabled || disabled}
                onClick={jumpPrev}
                size={size}
            >
                {prevRender(currentPage - 1 > 0 ? currentPage - 1 : 0)}
            </PaginationJump>
            {pageItem}
            <PaginationJump
                className={nextClasses}
                disabled={nextDisabled || disabled}
                onClick={jumpNext}
                size={size}
            >
                {nextRender(currentPage + 1 < allPages ? currentPage + 1 : allPages)}
            </PaginationJump>
            {
                showQuickJump && (
                    <PaginationQuickJump
                        size={size}
                        disabled={disabled}
                        onJumpPage={handleChangeCurrent}
                    />
                )
            }
        </ul>
    );
};
export default Pagination;
