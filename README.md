# 介绍

使用 webpack4，并且介绍了四种在 html 中图片的打包方式

## 方法一：copy-webpack-plugin

把图片放在 assets 目录，使用 copy-webpack-plugin

src目录如下：

```
src
├── assets
│   └── happy.jpg
├── happy.jpg
├── index.html
├── index.js
├── index.scss
└── logo.png
```

html文件如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    图片加载
    <img src="./assets/happy.jpg" alt="" />
  </body>
</html>
```

webpack配置：

```js
// npm install -D copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

//...
		new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src/assets'),
        to: 'assets'
      }
    ])
```



## 方法二：html-withing-plugin（推荐）

使用 html-withing-plugin（推荐）

```
npm install -S html-withing-plugin
```

webpack配置loader:

```js
{
  test: /\.(htm|html)$/i,
  loader: 'html-withimg-loader'
}
```



## 方法三：使用 html-loader

官方示例

webpack配置loader:

```js
{
  test: /\.(html)$/,
    use: {
      loader: 'html-loader',
        options: {
          attrs: ['img:src', 'img:data-src']
        }
    }
}
```



## 方法四：直接 require 的方式引用

html文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    图片加载
    <!-- 直接在html中使用插值的方式引用Image图片，使用require -->
    <img src="${require('./happy.jpg')}" alt="" />
  </body>
</html>
```

