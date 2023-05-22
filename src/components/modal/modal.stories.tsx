import Modal, {IModalProps} from "./modal";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "../button/button";
import React from "react";
export default ({
    title: 'Modal',
    component: Modal
}) as ComponentMeta<IModalProps>;

const Template: ComponentStory<IModalProps> = (args) => {
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
            <Modal open={open} onClose={() => setOpen(false)} {...args}>
                {args.children || '这是一段常规描述性文字'}
            </Modal>
        </div>
    );
};


export const defaultModal = Template.bind({});
defaultModal.storyName = '主要参数使用';
defaultModal.args = {
    title: '卡片弹窗标题',
    showIcon: false,
    closeable: false,
    maskClosable: false,
    okText: '我知道了',
    cancelText: '取消',
    children: '这是一段常规描述性文字',
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