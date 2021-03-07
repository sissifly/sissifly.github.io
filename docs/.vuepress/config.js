module.exports = {
  title: 'sissi的博客',
  description: '...',
  themeConfig: {
    sidebar: {
      '/': [{
        title: '入门系列',
        collapsable: false,
        children: [
          '/storybook/intro',
          '/http2/intro',
          '/pwa/intro'
        ]
      },
      {
        title: 'CODE',
        collapsable: false,
        children: [
          '/code/deleteProps',
          '/code/kString'
        ]
      }]
    }
  }
}
