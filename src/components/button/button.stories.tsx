import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './button';
import { SLButton } from '../core';
import IconFont from '../icon/icon';

export default ({
    title: 'Button',
    component: Button
}) as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (<Button {...args} />);

// 按钮默认样式示例
export const defaultButton = Template.bind({});
defaultButton.storyName = '主要参数使用';
defaultButton.args = {
    children: '🌈 平平无奇的按钮',
    btnType: 'primary',
    size: 'normal',
    disabled: false,
    pure: false
};

export const ButtonWithColor = () => (
    <>
      <Button btnType="primary">primary button </Button>
      <Button btnType="line"> line button </Button>
      <Button btnType="secondary"> secondary button </Button>
      <Button btnType="secondary2"> secondary2 button </Button>
      <Button btnType="text"> text button </Button>
    </>
);

ButtonWithColor.storyName = '不同类型的按钮';

export const ButtonWithDisabled = () => (
  <>
    <Button btnType="primary" disabled>primary button </Button>
    <Button btnType="line" disabled> line button </Button>
    <Button btnType="secondary" disabled> secondary button </Button>
    <Button btnType="secondary2" disabled> secondary2 button </Button>
    <Button btnType="text" disabled> text button </Button>
  </>
);

ButtonWithDisabled.storyName = '不同类型的按钮状态为disabled';

export const ButtonWithLink = () => (
  <>
    <div className="row">
      <Button
        btnType="link"
      >
        link btn
      </Button>
      <Button
        btnType="link"
      >
        <IconFont icon="icon-VideoOutlined" />
        播放
      </Button>
      <Button
        btnType="link"
        disabled
      >
        disabled link btn
      </Button>
      <Button
        btnType="link"
        disabled
      >
        <IconFont icon="icon-VideoOutlined" />
        播放
      </Button>
      
    </div>

    <div className="row">
      <Button
        btnType="link2"
      >
        link2 btn
      </Button>
      <Button
        btnType="link2"
      >
        <IconFont icon="icon-ViewDocumentOutlined" />
        search
      </Button>

      <Button
        btnType="link2"
        disabled
      >
        disabled link2 btn
      </Button>
      <Button
        btnType="link2"
        disabled
      >
        <IconFont icon="icon-ViewDocumentOutlined" />
        search
      </Button>
    </div>
  </>
);

ButtonWithLink.storyName = '链接按钮';

export const ButtonWithSize = () => (
  <>
    <h4>目前尺寸只有两种，普通尺寸就是大尺寸</h4>
    <div>
      <Button btnType="primary" size="small"> small button </Button>
      <Button btnType="line" size="small"> small button </Button>
      <Button btnType="secondary" size="small"> small button </Button>
      <Button btnType="secondary2" size="small"> small button </Button>
      <Button btnType="text" size="small"> small button </Button>
    </div>
  </>
);
ButtonWithSize.storyName = '小尺寸的按钮';

export const ButtonWithIcon = () => (
  <>
    <Button btnType="primary">
      <IconFont
        icon="icon-CompassionOutlined"
        style={{
          color: 'red'
        }}
      />
      primary button with icon
    </Button>

    <Button btnType="text">
      <IconFont icon="icon-PlusOutlined" />
      text button with icon
    </Button>

    <Button btnType="line">
      <IconFont icon="icon-InfoFilled" />
      注意！
    </Button>
    <Button
      btnType="text"
      size="small"
      onClick={() => alert('download success')}
    >
      <IconFont icon="icon-xiazai" />
      下载
    </Button>
  </>
);

ButtonWithIcon.storyName = '带icon的按钮';

export const ButtonIcon = () => (
  <>
    <h4>正常尺寸icon button</h4>
    <div>
      <Button
        btnType="icon"
      >
        <IconFont icon="icon-AttentionOutlined" />
      </Button>
      <Button
        btnType="icon2"
      >
        <IconFont icon="icon-xiazai" />
      </Button>
    </div>
    <h4>自定义尺寸</h4>
    <div>
      <Button
        btnType="icon"
        size="small"
      >
        <IconFont icon="icon-LicenseOutlined" fontSize="20px"/>
      </Button>
      <Button
        btnType="icon2"
        size="small"
      >
        <IconFont icon="icon-InfoFilled" fontSize="20px" />
      </Button>
    </div>
    <h4>disabled icon button</h4>
    <div>
      <Button
        btnType="icon"
        disabled
      >
        <IconFont icon="icon-SoundOnOutlined" />
      </Button>
      <Button
        btnType="icon2"
        disabled
      >
        <IconFont icon="icon-ShowOutlined" />
      </Button>
    </div>
  </>
);

ButtonIcon.storyName = 'icon按钮';

export const ButtonWithFunc = () => (
  <>
    <div className="row">
      <Button
        btnType="primary"
      >
        primary btn
      </Button>
      <Button
        btnType="primary"
        status="success"
      >
        primary success btn
      </Button>
      <Button
        btnType="primary"
        status="warn"
      >
        primary warn btn
      </Button>
      <Button
        btnType="primary"
        status="danger"
      >
        primary danger btn
      </Button>
      <Button
        btnType="primary"
        status="success"
        disabled
      >
        disabled btn
      </Button>
    </div>
    <div className="row">
      <Button
        btnType="line"
      >
        line btn
      </Button>
      <Button
        btnType="line"
        status="success"
      >
        line success btn
      </Button>
      <Button
        btnType="line"
        status="warn"
      >
        line warn btn
      </Button>
      <Button
        btnType="line"
        status="danger"
      >
        line danger btn
      </Button>
      <Button
        btnType="line"
        status="success"
        disabled
      >
        disabled btn
      </Button>
    </div>
    
    <div className="row">
      <Button
        btnType="secondary"
      >
        secondary btn
      </Button>
      <Button
        btnType="secondary"
        status="success"
      >
        secondary success btn
      </Button>
      <Button
        btnType="secondary"
        status="warn"
      >
        secondary warn btn
      </Button>
      <Button
        btnType="secondary"
        status="danger"
      >
        secondary danger btn
      </Button>
      <Button
        btnType="secondary"
        status="success"
        disabled
      >
        disabled btn
      </Button>
    </div>
  </>
);

ButtonWithFunc.storyName = '功能主题按钮';


export const ButtonWithLoading = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(!loading);
  }

  return (
    <Button
      btnType="primary"
      disabled={loading}
      style={{
        width: 200
      }}
      onClick={handleClick}
    >
      {
        loading
          ? (
            <>
              <IconFont
                icon="icon-RefreshOutlined"
                className="spin"
              />
              loading
            </>
          ) : 'submit'
      }
    </Button>
  );
}

ButtonWithLoading.storyName = '实现loading效果';

const splitStyle = {
  color: 'orange'
}
export const ButtonWithCore = () => (
  <div style={{background: '#ccc'}}>
    <span style={splitStyle}>|</span>
    <SLButton>pure button</SLButton>
    <span style={splitStyle}>|</span>
    <SLButton btnType="secondary">secondary</SLButton>
    <span style={splitStyle}>|</span>
    <SLButton size="large">large</SLButton>
  </div>
);

ButtonWithCore.storyName = 'Core Button——不带任何内外边距和边框的按钮(🎨设计同学可以忽略这块)';

