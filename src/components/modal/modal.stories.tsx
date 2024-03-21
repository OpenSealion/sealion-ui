import Modal from "./modal";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "../button/button";
import React from "react";
import IconFont from '../icon';
import message from "../message/index";
export default ({
    title: 'Modal',
    component: Modal
}) as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => {
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
            <Modal
                open={open}
                closeable
                onClose={() => setOpen(false)} {...args}>
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
    loading: false,
};

export const typesModal = () => {
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36 }}>
            <>
                <Button
                    btnType="secondary2"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    这是一个普通的弹窗
                </Button>
                    <Modal open={open} onClose={() => setOpen(false)} title={'这是一个普通的弹窗'}>
                        这是一段常规描述性文字
                    </Modal>
            </>
            <>
                <Button
                    btnType="secondary2"
                    onClick={() => {
                        setOpen1(true);
                    }}
                >
                    可以没有关闭按钮
                </Button>
                <Modal
                    open={open1}
                    onClose={() => setOpen1(false)}
                    title={'可以没有关闭按钮'}
                    closeable={false}
                >
                    这是一段常规描述性文字
                </Modal>
            </>
            <>
                <Button
                    btnType="secondary2"
                    onClick={() => {
                        setOpen2(true);
                    }}
                >
                    可以没有遮罩层
                </Button>
                <Modal
                    open={open2}
                    onClose={() => setOpen2(false)}
                    title={'可以没有遮罩层'}
                    maskClosable={false}
                    closeable={false}
                >
                    这是一段常规描述性文字
                </Modal>
            </>
            <>
                <Button
                    btnType="secondary2"
                    onClick={() => {
                        setOpen3(true);
                    }}
                >
                    可以修改icon
                </Button>
                <Modal
                    open={open3}
                    onClose={() => setOpen3(false)}
                    title={'可以修改icon'}
                    closeable={false}
                    icon={<IconFont icon={'icon-CheckCircleFilled'} style={{color: '#00B365', fontSize: 24}}/>}
                >
                    这是一段常规描述性文字
                </Modal>
            </>
            <>
                <Button
                    btnType="secondary2"
                    onClick={() => {
                        setOpen4(true);
                    }}
                >
                    可以修改按钮文字
                </Button>
                <Modal
                    open={open4}
                    onClose={() => setOpen4(false)}
                    title={'可以修改按钮文字'}
                    closeable={false}
                    icon={<IconFont icon={'icon-InfoFilled'} style={{color: '#faad14', fontSize: 24}}/>}
                    okText={'知道了'}
                    cancelText={'算了吧'}
                >
                    这是一段常规描述性文字
                </Modal>
            </>
            <>
                <Button
                    btnType="secondary2"
                    onClick={() => {
                        setOpen5(true);
                    }}
                >
                    可以添加关闭回调
                </Button>
                <Modal
                    open={open5}
                    onClose={() => setOpen5(false)}
                    title={'可以添加关闭回调'}
                    closeable={false}
                    okText={'点击执行回调'}
                    onOk={() => {
                        message.success({title: '这是一个成功消息通知'});
                    }}
                >
                    这是一段常规描述性文字
                </Modal>
            </>
            <>
                <Button
                    btnType="secondary2"
                    onClick={() => {
                        setOpen6(true);
                    }}
                >
                    可以不显示前面的icon
                </Button>
                <Modal
                    open={open6}
                    onClose={() => setOpen6(false)}
                    showIcon={false}
                    title={'可以不显示前面的icon'}
                >
                    这是一段常规描述性文字
                </Modal>
            </>
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
