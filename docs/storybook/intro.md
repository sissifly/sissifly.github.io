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
## 4. 插件介绍
storybook 很多功能是靠插件来实现的，大多数插件都需要提前注册，.storybook下addons.js中进行注册(固定文件名)，如下注册了addon-actions和addon-links两个插件：
```javascript
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
```
storybook 的插件分为两类：装饰器 Decorator 和 原生插件 Native Addon。
### 4.1 装饰器 Decorator
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
### 4.2 原生插件 Native Addons    
原生插件提供了装饰story之外的很多功能，利用storybook平台与之交互。  
以addon-notes为例  
- 安装插件  
```npm i -save @storybook/addon-notes```  
- 在.storybook/addons.js中注册插件  
```import '@storybook/addon-notes/register'```  
- 全局配置  
插件可以在具体story中引用，也可全局配置，如下方式修改config.js即可。  
```javascript
import { configure, addDecorator } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes'
// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
addDecorator(withNotes)
configure(loadStories, module);
```
- 修改story  
```javascript
storiesOf('Button', module)
  .add('with text', () => ({
    components: { MyButton },
    template: '<my-button>hello button</my-button>'
  }),{
    notes: 'A very simple component'
  })
```
效果：  
![](./img/notes.png)  
  
### 4.3 插件列表
以下是由storybook team 维护的支持vue的插件列表[github地址](https://github.com/storybooks/storybook/blob/master/ADDONS_SUPPORT.md)

| 插件 | 功能 |
| :------ | :------ |
| [a11y](https://github.com/storybooks/storybook/tree/master/addons/a11y) | UI组件易于理解，accessibility |
| [actions](https://github.com/storybooks/storybook/tree/master/addons/actions) | 打印event数据 |
| backgrounds | 中等文本 |
| centered | 中等文本 |
| events | 中等文本 |
| google-analytics | 中等文本 |
| knobs | 中等文本 |
| links | 中等文本 |
| notes | 中等文本 |
| options | 中等文本 |
| cssresources | 中等文本 |
| storyshots | 中等文本 |
| storysource | 中等文本 |
| viewport | 中等文本 |

此外还有一些有社区提供的插件见[这里](https://storybook.js.org/addons/addon-gallery/)

### 4.3 插件示例

#### 4.3.1 actions
- 安装  
```npm i -dev-save @storybook/addon-actions```
- 注册 addons.js   
```import '@storybook/addon-actions/register';```
- 调用 action()      
```javascript
import { action } from '@storybook/addon-actions'
import MyButton from './MyButton';
storiesOf('Button', module)
  .add('hell button', () => ({
    components: { MyButton },
    template: '<my-button @click="click">Hello Button</my-button>',
    methods: { click: action('clicked') },
    }))
```
![](./img/action.png)  

如果需要监听多个事件，还可以使用actions()  
```javascript
import { storiesOf } from '@storybook/vue';
import { actions } from '@storybook/addon-actions'
import MyButton from './MyButton';
storiesOf('Button', module)
  .add('hell button', () => ({
    components: { MyButton },
    template: '<my-button @click="onClick" @mouseover="onMouseover">Hello Button</my-button>',
    methods: { 
      ...actions('onClick', 'onMouseover')
    }
  }))
```
![](./img/actions.png) 




## 5. webpack配置
storybook 内部集成 webpack。