import { addons } from '@storybook/addons'
import { themes, create } from '@storybook/theming'

const myTheme = create({
    ...themes.dark,
    brandTitle: 'Sea-lion-ui',
    brandUrl: 'https://openaide.pjlab.org.cn',
    brandImage: 'https://openxlabs.oss-cn-shanghai.aliyuncs.com/openxlab/uploads/sea-lion-ui.png',
    brandTarget: '_self',
});

addons.setConfig({
    theme: myTheme,
})