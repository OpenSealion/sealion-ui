import { Divider as AntdDivider } from 'antd';
import classNames from 'classnames';

const Divider = ({ ...rest }) => {
    const DivideClasses = classNames('seal-divide-vertical');

    return (
        <AntdDivider {...rest} className={DivideClasses} />
    );
};
export default Divider;
