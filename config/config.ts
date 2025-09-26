import { defineConfig } from '@umijs/max';
import layout from './layout';
import proxy from './proxy';
import routes from './routes';
/*
* @see https://umijs.org/docs/max/layout-menu
* */
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout,
  routes,
  proxy,
  npmClient: 'yarn',
  tailwindcss: {},
  title: 'Test-Mall',
});
