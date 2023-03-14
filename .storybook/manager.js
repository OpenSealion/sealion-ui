import { addons } from '@storybook/addons'
import { themes, create } from '@storybook/theming'

const myTheme = create({
    ...themes.dark,
    brandTitle: 'Sea-lion-ui',
    brandUrl: 'https://openaide.pjlab.org.cn',
    brandImage: 'https://oss.openmmlab.com/aide/AIDE_logo.svg',
    brandTarget: '_self',
});

addons.setConfig({
    theme: myTheme,
})