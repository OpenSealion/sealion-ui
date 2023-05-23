import Space, {ISpaceProps} from "./space";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "../button/button";
import IconFont from "../icon/index";
import Divider from "../divider/index";
export default ({
    title: 'space',
    component: Space
}) as ComponentMeta<ISpaceProps>;

const Template: ComponentStory<ISpaceProps> = (args) => (
    <Space {...args}>
        文字🌍
        <Button btnType="primary">
            按钮
        </Button>
        <Button btnType="primary">
            按钮
        </Button>
        <Button
            btnType="primary"
            size="normal"
        >
            🌈 平平无奇的按钮
        </Button>
        <Button btnType="primary">
            按钮
        </Button>
        😻=v=😻
        <Button btnType="secondary">
            按钮1
        </Button>
        <Button btnType="secondary2">
            按钮2
        </Button>
        再来一段普通文字 💫
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