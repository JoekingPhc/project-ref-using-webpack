const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const path = require('path')
module.exports ={
  mode: 'development',
  entry:  {
    new_project: './src/index',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    // 根据 entry 内定义的名字来创建这个文件名
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          // 表示在images这个目录下创建这些文件, 由图片自己的名字加上10位的哈希值和文件类型ext组成
          // 配哈希的目的最主要是防止重名
          filename: 'images/[name].[hash:10][ext]' 
        }
      }
    ]  
  }
  ,
  plugins: [
    new HtmlWebpackPlugin({
      // 模版的名称 filename
      // 模版地址 template 
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
        template: './src/login.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })

  ]
}