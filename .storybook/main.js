module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config) => {
    const lessLoaderChain = {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ]
    }

    if (config.module.rules[config.module.rules.length - 1].oneOf) {
      config.module.rules[config.module.rules.length - 1].oneOf.unshift(lessLoaderChain);
    } else {
      config.module.rules.unshift(lessLoaderChain);
    }
    
    return config;
  },
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}