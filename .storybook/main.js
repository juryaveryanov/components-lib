const path = require('path')
const eslintPlugin = require('vite-plugin-eslint').default
const svgLoader =  require('vite-svg-loader').default

module.exports = {
  'stories': [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.js'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
    '@storybook/addon-toolbars'
  ],
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config, { configType }) {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    config.resolve.alias['~'] = path.resolve(__dirname, '..')
    if(configType==='DEVELOPMENT'){
      config.root = path.resolve(__dirname, '../storydist');
    }
    if( configType==='PRODUCTION' ) {
      config.base = '/components-lib/storybook/'
    }
    config.plugins.push(
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            },
            {
              name: 'cleanupIDs',
              active: true
            }
          ]
        }
      }),
      eslintPlugin({ cache: false })
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
  }
}