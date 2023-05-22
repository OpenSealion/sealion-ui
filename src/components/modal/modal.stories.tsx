import Modal, {IModalProps} from "./modal";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "../button/button";
import React from "react";
import ModalCard from "./modal-card";
import IconFont from '../icon';
import message from "../message/index";
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

export const typesModal = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36 }}>
            <ModalCard
                open
                onClose={() => null}
                title={'这是一个普通的弹窗'}
            >
                这是一段常规描述性文字
            </ModalCard>
            <ModalCard
                open
                onClose={() => null}
                title={'可以没有关闭按钮'}
                closeable={false}
            >
                这是一段常规描述性文字
            </ModalCard>
            <ModalCard
                open
                onClose={() => null}
                title={'可以没有遮罩层'}
                maskClosable={false}
                closeable={false}
            >
                这是一段常规描述性文字
            </ModalCard>
            <ModalCard
                open
                onClose={() => null}
                title={'可以修改icon'}
                closeable={false}
                icon={<IconFont icon={'icon-CheckCircleFilled'} style={{ color: '#00B365', fontSize: 24 }} />}
            >
                这是一段常规描述性文字
            </ModalCard>
            <ModalCard
                open
                onClose={() => null}
                title={'可以修改按钮文字'}
                closeable={false}
                icon={<IconFont icon={'icon-InfoFilled'} style={{ color: '#faad14', fontSize: 24 }} />}
                okText={'知道了'}
                cancelText={'算了吧'}
            >
                这是一段常规描述性文字
            </ModalCard>
            <ModalCard
                open
                onClose={() => null}
                title={'可以添加关闭回调'}
                closeable={false}
                okText={'点击执行回调'}
                onOk={() => {
                    message.success({title: '这是一个成功消息通知'});
                }}
            >
                这是一段常规描述性文字
            </ModalCard>
        </div>
    )
};

typesModal.storyName = '不同类型的弹窗';

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