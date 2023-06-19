import React from 'react';
import classNames from 'classnames';
import BreadcrumbSeparator from './breadcrumb-separator';

export interface BreadcrumbItemProps {
    children?: React.ReactNode,
    separator?: React.ReactNode,
    isLast?: boolean
}

const BreadcrumbItem:React.FC<BreadcrumbItemProps> = (props) => {
    const {
        children,
        separator,
        isLast
    } = props;
    const breadcrumbItemClasses = classNames(
        'seal-breadcrumb-item',
        isLast && 'seal-breadcrumb-item-last'
    );

    return (
        <>
            <li className={breadcrumbItemClasses}>
                {children}
            </li>
            {separator && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
        </>
    );
};
export default BreadcrumbItem;
