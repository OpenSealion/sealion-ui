# sea-lion-ui
内容中心业务组件

# 使用
1. 创建项目
```sh
> create-mm-app create hello-app
> cd hello-app
> npm i sea-lion-app
```

2. 首先全局import样式

### app.tsx
```js
import 'sea-lion-ui/dist/index.css';
```

3. 在业务代码使用
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

# 命令
```sh
# 运行开发环境
npm run dev

# 打包
npm run build

```

