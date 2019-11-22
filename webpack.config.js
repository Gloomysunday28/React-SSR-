const path = require('path')
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, arg) => {
  const isServer = arg.target === 'node'

  const webpackConfig = {
    mode: env,
    // devtool: 'cheap-module-source-map',
    entry: ['babel-polyfill'].concat(isServer ? `./src/react-server.js` : `./src/react-client.js`),
    output: {
      path: path.resolve(__dirname, isServer ? './server' : './dist'),
      // filename: '[name].js',
      filename: arg.filename,
      chunkFilename: '[name].[chunkhash].js'
    },
    devServer: {
      inline: true,
      contentBase: path.resolve(__dirname, './dist'),
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: arg.target === 'node' ? ['isomorphic-style-loader', {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }] : [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                // publicPath: '../',
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: arg.target === 'node' ? ['isomorphic-style-loader', {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }, 'less-loader'] : [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                // publicPath: '../',
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            'less-loader'
          ]
        },
      ]
    }
  }

  if (arg.target === 'node') {
    webpackConfig.externals = [nodeExternals()] // 服务端不打包第三方依赖
    webpackConfig.target = 'node' // 不打包node原生方法
    webpackConfig.output.libraryTarget = 'commonjs2' // node环境执行使用commonJs规范
  } else {
    // webpackConfig.plugins = [new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // }), new HTMLWebpackPlugin({
    //   template: 'index.html',
    //   filename: 'index.html',
    //   inject: true
    // })]

    webpackConfig.plugins = [new MiniCssExtractPlugin({
      filename: '[name].css'
    })]
  }

  return webpackConfig
}