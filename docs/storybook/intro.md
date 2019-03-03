# storybook教程

storybook是一套UI组件的开发环境，可以浏览组件库，查看每个组件的不同状态，交互式开发测试组件，目前支持react、vue、angular等主流前端框架。

## 1. 快速上手
以vue为例，介绍storybook
- 安装  
```npm i  -g @storybook/cli```
- 初始化  
切到项目目录，执行```sb init```  
初始化成功，根目录下生成2个目录：  **\.storybook**、**stories**  
![](./img/directory.png)  
package.json会自动添加如下命令：  
```"storybook": "start-storybook -p 6006"```  
```"build-storybook": "build-storybook"``` 
- 安装模块  
vue、@storybook/vue、@babel/core、babel-preset-vue、vue-loader、vue-template-compiler
- 运行  
```npm run storybook```
![](./img/init.png)

## 2. 配置文件
- config.js
```javascript
import { configure } from '@storybook/vue';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
``` 
该文件功能自动导入stories文件。
**require.context** 是 webpack 的方法，实现自动加载模块。**configure** 是 storybook 的提供的API。
## 3. 编写story文件
一个story对应一个组件的某个状态。通过编写story展示UI组库，每个story类似一个视觉测试案例。
简单示例：
```javascript
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
// 导入组件
import MyButton from './MyButton';

storiesOf('Button1', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button @click="action">Hello Button</my-button>',
    methods: { action: action('clicked') },
  }))
  .add('with some emoji', () => ({
    components: { MyButton },
    template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
    methods: { action: action('clicked') },
  }));
  ``` 
## 4. 插件
storybook 很多功能是靠插件来实现的，大多数插件都需要提前注册，.storybook下addons.js中进行注册，如下注册了addon-actions和addon-links两个插件：
```javascript
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
```
storybook 的插件分为两类：装饰器 Decorator 和 原生插件 Native Addon。
#### 4.1 装饰器 Decorator
装饰器是包装组件或者一个story的装饰。  
- 包装组件
新建一个center.js  
```javascript
const styles = {
  textAlign: 'center',
};
const Center = ({ children }) => (
  <div style={styles}>
    { children }
  </div>
);
```
修改button.stories.js
```javascript
import Vue from 'vue'
import { storiesOf } from '@storybook/vue';

import MyButton from './MyButton';
import Center from './center'
Vue.component({center: Center})
Vue.component({MyButton: MyButton})

storiesOf('Button', module)
  .add('with text', () => ({
    template: '<Center><Button>Hello Button</Button></Center>'
  }))
```
实现了组件在页面居中展示  
- story装饰器

## 5. webpack配置
storybook 内部集成 webpack。