import React, { CSSProperties } from 'react';
import classNames from 'classnames';

export interface IIconFOnt {
    icon: string;
    color?: string;
    fontSize?: string;
    style?: CSSProperties;
    className?: string;
}
// oss://openmmlab-open/x-lab/sea-lion-ui/iconfont/
// https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=3858115&keyword=&project_type=&page=
const IconFont: React.FC<IIconFOnt> = ({
    icon, color, fontSize, style, className
}) => {
    const classes = classNames(className, icon, 'iconfont');

    return (
        <i
            className={classes}
            style={{
                display: 'inline-block',
                color: `${color && color}`,
                fontSize: `${fontSize && fontSize}`,
                ...style
            }}
        />
    );
};
export default IconFont;
