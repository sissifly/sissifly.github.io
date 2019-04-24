module.exports = {
  title: 'sissi的博客',
  description: '...',
  themeConfig: {
    sidebar: {
      '/': [{
        title: '前端',
        collapsable: false,
        children: [
          '/storybook/intro',
          '/http2/intro',
          '/pwa/intro'
        ]
      }]
    }
  }
}
