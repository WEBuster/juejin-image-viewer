# juejin-image-viewer

[![Build Status](https://img.shields.io/travis/WEBuster/juejin-image-viewer.svg?style=flat-square)](https://travis-ci.org/WEBuster/juejin-image-viewer)
[![Version](https://img.shields.io/npm/v/juejin-image-viewer.svg?style=flat-square)](https://www.npmjs.com/package/juejin-image-viewer)
[![License](https://img.shields.io/npm/l/juejin-image-viewer.svg?style=flat-square)](LICENSE)

[掘金](https://juejin.im) 图片查看插件。

## 安装

```bash
npm i -S juejin-image-viewer
```

## 使用

### 初始化

#### 模块化环境

```js
import JuejinImageViewer from 'juejin-image-viewer'

const imageViewer = new JuejinImageViewer(...)
```

#### 浏览器直引

```html
<script src="path/to/juejin-image-viewer.min.js"></script>
```

```js
var imageViewer = new JuejinImageViewer(...)
```

### 构造参数

```js
new JuejinImageViewer(container || containerList || selector, {
  targetFilter: elem => elem.nodeName === 'IMG' && elem.naturalWidth,
  urlGetter: elem => elem.getAttribute('src'),
  urlHandler: url => url,
  eventName: 'click',
  containerClassName: 'juejin-image-viewer__container',
  boxClassName: 'juejin-image-viewer__box',
  imageClassName: 'juejin-image-viewer__image',
  cursor: 'zoom-in',
  backgroundColor: '#fff',
  transitionDuration: 200,
  margin: 0,
  parent: null
})
```

### 方法

```js
imageViewer.hide()
imageViewer.destroy()
```
