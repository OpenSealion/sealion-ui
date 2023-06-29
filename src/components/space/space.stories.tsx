import Space from "./space";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "../button/button";
import IconFont from "../icon/index";
import Divider from "../divider/index";
export default ({
    title: 'Space',
    component: Space
}) as ComponentMeta<typeof Space>;

const Template: ComponentStory<typeof Space> = (args) => (
    <Space {...args}>
        🌍右边是空节点
        {<></>}
        左边是空节点🌍
        <Button btnType="primary">
            按钮
        </Button>
        <Button
            btnType="primary"
            size="normal"
        >
            🌈 可以控制换行
        </Button>
        <Button btnType="primary">
            按钮
        </Button>
        😻=v=😻
        {null}
        {undefined}
        <Button btnType="primary">
            null 和 undefined 不会被渲染
        </Button>
        <Button btnType="secondary">
            按钮1
        </Button>
        <Button btnType="secondary2">
            按钮2
        </Button>
        size 可以是数字 💫
        <Button
            btnType="icon2"
            size="small"
        >
            <IconFont icon="icon-InfoFilled" fontSize="20px" />
        </Button>
    </Space>
);


export const defaultSpace = Template.bind({});
defaultSpace.storyName = '主要参数使用';
defaultSpace.args = {
    size: 'small',
    direction: 'horizontal',
    align: 'center',
    wrap: true,
    split: '丨'
};