export default {
  // 开发环境代理配置
  dev: {
    '/api': {
      target: 'http://localhost:8000', // 后端 API 地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  // 测试环境代理配置
  test: {
    '/api': {
      target: 'http://test-api.example.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  // 生产环境代理配置
  prod: {
    '/api': {
      target: 'http://api.example.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
};