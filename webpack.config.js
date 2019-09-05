const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 方法一：使用copy-webpack-plugin
// npm install -D copy-webpack-plugin
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    // path.join() 去拼接路径
    // __dirname 当前文件的绝对路径
    filename: 'bundle.js',
    path: path.join(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // sass-loader node-sass两个依赖都需要安装
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            // limit表示如果图片大于5KB，就以路径形式展示，小于的话就用base64格式展示
            limit: 5 * 1024,
            // 打包输出目录
            outputPath: 'images',
            // 打包输出图片名称
            name: '[name]-[hash:4].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'url-loader'
      },
      // 方法二，使用html-withimg-loader 推荐，比较简单
      // npm install -S html-withimg-loader
      // {
      //   test: /\.(htm|html)$/i,
      //   loader: 'html-withimg-loader'
      // }
      // {
      // 方法三，使用html-loader
      // npm install -D html-loader  
      //   test: /\.(html)$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       attrs: ['img:src', 'img:data-src']
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    // 方法一配置：使用copy-webpack-plugin
    // 注意src目录下的assets目录，这样直接复制了图片
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, 'src/assets'),
    //     to: 'assets'
    //   }
    // ])
  ]
}

module.exports = config