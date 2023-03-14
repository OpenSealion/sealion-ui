import React, { CSSProperties } from 'react';

// https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=3858115&keyword=&project_type=&page=
const IconFont:React.FC<{
    icon:string,
    color?:string,
    fontSize?:string,
    style?: CSSProperties
}> = ({
    icon, color, fontSize, style
}) => {
    return <i className={`iconfont ${icon}`} style={{ color: `${color && color}`, fontSize: `${fontSize && fontSize}`, ...style }} />;
};
export default IconFont;
