<div align="center"><a name="readme-top"></a>
<img src="./doc/imgs/logo.svg" width="60%" alt="logo" />
<h3>SeaLion UI is a lightweight and easily extensible React UI library.</h3>
<br/>

<div>
<img alt="Static Badge" src="https://img.shields.io/badge/v16%2B-white?style=flat&label=nodejs&labelColor=%2389c732&color=white">
<img alt="Static Badge" src="https://img.shields.io/badge/sea%20lion%20ui-green?style=flat&label=ui%20component">
<img alt="Static Badge" src="https://img.shields.io/badge/weclome-green?style=flat&label=PRs">
<img alt="Static Badge" src="https://img.shields.io/badge/8.19.4-red?style=flat&label=npm&labelColor=black">
</div>
<br/>

English· [简体中文](https://github.com/OpenSealion/sealion-ui/blob/develop/README.md)

<img src="./doc/imgs/ui-overall.png" style="background: #fff" />
</div>

# Feature

<ul>
    <li>eveloping styles based entirely on flat design significantly reduces the amount of high-fidelity work required for similar styles;</li>
    <li>Lightweight, does not rely on antdUI or any other component libraries;</li>
    <li>Considering the current resources, sea-lion won't be adapted to scenarios and features (such as ssr) that the project won't need in the foreseeable future, so the code will be relatively simple and easy to add new features;</li>
</ul>



# Support Environment

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari |
| --- | --- | --- | --- |
| Edge | last 3 versions | last 3 versions | last 3 versions |

# Use SeaLion-client

Projects created with <a href="https://github.com/OpenSealion/sealion-client">SeaLion client</a> can use SeaLion-ui directly.
<br/>

```sh
> slc create hello-app # Creating a hello-app with sea-lion-client
> cd hello-app
```

# Install

### 1.Create project

```sh
npm i sea-lion-ui

```
<br/>

### 2.Import

### app.tsx

```js
import 'sea-lion-ui/dist/index.css';
```

### 3.Usage

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

# Development

1. Pull Code

```sh
git clone https://github.com/OpenSealion/sealion-ui.git
```

2. Run the program locally
```sh
# Run develop environment
npm run dev
```

3. Access to the web page
http://localhost:6006/?path=/story/welcome--page
<br/>

# Release

Just choose one of the following two commands to execute:
```sh
# interactive and allows you to confirm each task before execution
npm run release
# or auto increase version on patch
npm run release-auto;

# more info: https://github.com/release-it/release-it
```
