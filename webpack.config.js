const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 1313,
    hot: true,
  },
  entry: {
    // new_project: './src/index',
    // 多入口
    index: "./src/index.js",
    login: "./src/login.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // 根据 entry 内定义的名字来创建这个文件名
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          // 表示在images这个目录下创建这些文件, 由图片自己的名字加上10位的哈希值和文件类型ext组成
          // 配哈希的目的最主要是防止重名
          filename: "images/[name].[hash:10][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模版的名称 filename
      // 模版地址 template
      filename: "index.html",
      template: "./src/index.html",
      // 映射entry的key, 只会将key里的值打包到对应的template当中去
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/login.html",
      chunks: ["login"],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyWebpackPlugin({
      // 匹配路径
      patterns: [{
        from: path.resolve(__dirname, './src/img'),
        to: path.resolve(__dirname, './dist/img')
      }]
    })
  ],
};
