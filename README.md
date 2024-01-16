<div align="center"><a name="readme-top"></a>
<img src="./doc/imgs/logo.svg" width="60%" alt="logo" />

<h3>SeaLion UI是一套轻量化且易于拓展的React组件库</h3>
<br/>
<div>
<img alt="Static Badge" src="https://img.shields.io/badge/v16%2B-white?style=flat&label=nodejs&labelColor=%2389c732&color=white">
<img alt="Static Badge" src="https://img.shields.io/badge/sea%20lion%20ui-green?style=flat&label=ui%20component">
<img alt="Static Badge" src="https://img.shields.io/badge/weclome-green?style=flat&label=PRs">
<img alt="Static Badge" src="https://img.shields.io/badge/8.19.4-red?style=flat&label=npm&labelColor=black">
</div>
<br/>
<img src="./doc/imgs/ui-overall.png" style="background: #fff" />
</div>

# 特点
<ul>
    <li>完全基于面性风格开发样式，可以显著减少类似风格的高保真工作</li>
    <li>轻量，不依赖antdUI或者其他任何组件库；</li>
    <li>考虑到目前的资源，sea-lion不会去适配可见未来内项目不需要场景和功能（比如ssr），所以代码会相对简单，便于新增功能；</li>
</ul>

# 支持环境

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| --- | --- | --- | --- |
| Edge | last 3 versions | last 3 versions | last 3 versions |


# 使用SeaLion-client
使用 <a href="https://github.com/OpenSealion/sealion-client">SeaLion client</a> 创建的项目可直接使用SeaLion-ui
<br/>

```sh
> slc create hello-app # 使用sea-lion-client创建hello-app
> cd hello-app
```

# 手动安装
### 1.创建项目
```sh
npm i sea-lion-ui

```
<br/>

### 2.导入组件样式

### app.tsx
```js
import 'sea-lion-ui/dist/index.css';
```

### 3.使用组件
### hello.tsx
```js
import React from 'react';
import { useIntl } from 'react-intl';
import { Button, IconFont } from 'sea-lion-ui';

const Hello = () => {
    const Intl = useIntl();

    return (
        <div>
            {
                Intl.formatMessage({
                    id: 'hello',
                    defaultMessage: '嗨'
                })
            }
            <Button type="primary" disabled>
                <IconFont icon="icon-CompassionOutlined" />
                hello
            </Button>
        </div>
    );
};

export default Hello;
```

# 开发
1. 拉取代码

```sh
git clone https://github.com/OpenSealion/sealion-ui.git
```

2. 本地运行
```sh
# 运行开发环境
npm run dev
```

3. 访问
http://localhost:6006/?path=/story/welcome--page
<br/>

# 发布
以下两个命令选择一个执行即可：
```sh
# interactive and allows you to confirm each task before execution
npm run release
# or auto increase version on patch
npm run release-auto;

# more info: https://github.com/release-it/release-it
```
