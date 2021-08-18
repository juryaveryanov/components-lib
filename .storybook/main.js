const path = require('path')
const createSvgSpritePlugin = require('vite-plugin-svg-sprite').default
const  eslintPlugin = require('vite-plugin-eslint').default

module.exports = {
  'stories': [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-jest'
  ],
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config, { configType }) {
    
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    config.resolve.alias['~'] = path.resolve(__dirname, '..')
    config.resolve.alias.path = require.resolve('path-browserify')

    if( configType==='PRODUCTION' ) {
      config.base = '/components-lib/'
    }
    config.plugins.push(
      createSvgSpritePlugin({
        symbolId: 'icon-[name]-[hash]',
      }),
      eslintPlugin({cache:false})
    )
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData:  `
          @use "sass:math";
          @import "@/globalSCSS/index.scss";
        `,
        }
      }
    }
    return config
  },
}