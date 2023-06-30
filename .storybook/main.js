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
        'css-loader',
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
    const oneOfRule = config.module.rules.find(rule => !!rule.oneOf);
    if (oneOfRule) {
      oneOfRule.oneOf.unshift(lessLoaderChain);
    } else {
      config.module.rules.unshift(lessLoaderChain);
    }
    
    return config;
  },
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}