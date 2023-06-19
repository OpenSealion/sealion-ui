import classNames from 'classnames';
import React from 'react';

export interface BreadcrumbSeparatorProps {
    children?: React.ReactNode
}

const BreadcrumbSeparator:React.FC<BreadcrumbSeparatorProps> = (props) => {
    const {
        children
    } = props;
    const breadcrumbSeparatorClasses = classNames(
        'seal-breadcrumb-separator'
    );

    return (
        <li className={breadcrumbSeparatorClasses}>{children || '/'}</li>
    );
};
export default BreadcrumbSeparator;
