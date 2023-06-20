import React from 'react';
import classNames from 'classnames';
import BreadcrumbSeparator from './breadcrumb-separator';
import BreadcrumbItem from './breadcrumb-item';

export interface BreadcrumbItemType {
    key?: string,
    title?: React.ReactNode,
    separator?: React.ReactNode
}

export interface BreadcrumbProps {
    className?: string,
    items: BreadcrumbItemType[],
    separator?: React.ReactNode,
    maxCount?: number
}

const Breadcrumb:React.FC<BreadcrumbProps> = (props) => {
    const {
        className,
        items,
        separator = '/',
        maxCount = 4
    } = props;
    let itemRender = [];
    const BreadcrumbClasses = classNames(
        className,
        'seal-breadcrumb'
    );

    if (items && items.length > 0) {
        const itemCount = items.filter(ele => ele?.separator === undefined).length;
        let itemList = items;
        if (itemCount > maxCount) {
            itemList = [
                items[0],
                {
                    title: '···'
                },
                ...(items.slice(items.length - 2, items.length))
            ];
        }

        itemRender = itemList?.map((item, index) => {
            const {
                key,
                title,
                separator: itemSeparator
            } = item;
            if (itemSeparator !== undefined) {
                return <BreadcrumbSeparator key={key || index}>{itemSeparator}</BreadcrumbSeparator>;
            }
            return (
                <BreadcrumbItem
                    key={key || index}
                    separator={index === itemList.length - 1 ? '' : separator}
                    isLast={index === itemList.length - 1}
                >
                    {title}
                </BreadcrumbItem>
            );
        });
    }

    return (
        <nav className={BreadcrumbClasses}>
            <ol>{itemRender}</ol>
        </nav>
    );
};
export default Breadcrumb;
