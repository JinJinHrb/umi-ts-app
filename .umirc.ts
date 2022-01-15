import { defineConfig } from 'umi';
import { resolve } from 'path';
import { TITLE } from './src/utils/constants';

export default defineConfig({
  title: TITLE,
  hash: true,
  antd: {},
  dva: {
    immer: true,
    hmr: true,
  },

  // Warning: The current popular language does not exist, please check the locales folder!
  /* locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  }, */

  // 是否启用按需加载
  // dynamicImport: {},

  devtool: 'eval-cheap-module-source-map',

  // 设置 node_modules 目录下依赖文件的编译方式
  nodeModulesTransform: {
    type: 'none',
  },
  // targets: {
  //   ie: 11,
  // },
  theme: {
    '@primary-color': '#1DA57A',
  },
  proxy: {
    '/api': {
      target: 'http://128.1.1.1:8010/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  mfsu: {},

  // 如果用了styled-components 那么ssr会失败
  //   extraBabelPlugins: ['babel-plugin-styled-components'],
});
