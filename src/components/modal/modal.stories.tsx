import Modal, {IModalProps} from "./modal";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button, {ButtonProps} from "../button/button";
import React from "react";
export default ({
    title: 'Modal',
    component: Button
}) as ComponentMeta<ButtonProps>;

const Template: ComponentStory<IModalProps> = (args) => (<Button {...args} />);


export const defaultModal = Template.bind({});
defaultModal.storyName = '主要参数使用';
defaultModal.args = {
    children: '确认',
    btnType: 'primary',
    size: 'normal',
    onClick: () => {

    }
};

export const normalModal = () => {
    const [open, setOpen] = React.useState(false);
    return (
        <div style={{ display: 'flex', gap: 36 }}>
            <Button
                btnType="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                点击打开弹窗
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} title={'卡片弹窗标题'}>
                这是一段常规描述性文字
            </Modal>
        </div>
    );
}

normalModal.storyName = '点击按钮打开弹窗';