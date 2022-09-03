const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
    index: path.resolve(__dirname, "../src/index.js"),
    login: path.resolve(__dirname, "../src/login.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    // 根据 entry 内定义的名字来创建这个文件名
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"],
        // MiniCssExtractPlugin.loader帮助对CSS文件进行一个分离, 否则很多css都会被打包到bundle里面, 造成打包体积很大
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
      patterns: [
        {
          from: path.resolve(__dirname, "../src/img"),
          to: path.resolve(__dirname, "../dist/img"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:6].css",
      chunkFilename: "css/[name.chunk.css",
    }),
    // 每次打包自动删除之前的dist目录
    new CleanWebpackPlugin()
  ],
  // 对模块化结果进行一个优化的阶段 optimization, 对资源进行一定的优化
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({ sourceMap: true }),
      new CssMinimizerPlugin(),
    ],
    // 代码分割
    splitChunks: {
      chunks: "all", // 针对所有模块进行异步打包,
      minSize: 30 * 1024, // 300kb以上的chunk时再去打这个包
      name: "common",
      cacheGroups: {
        // 对某个库进行单独的打包
        jquery: {
          name: "jquery",
          test: /jquery/,
          chunks: "all",
        },
        "lodash-es": {
          name: "lodash-es",
          test: /lodash-es/,
          chunks: "all",
        },
      },
    },
  },
};
