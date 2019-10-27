const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
require('dotenv').config({path: path.resolve(__dirname, '.env')});

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

const config = {
  entry: path.join(SRC_PATH, 'index.js'),
  output: {
    path: BUILD_PATH,
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'index.html'),
      favicon: path.join(SRC_PATH, 'assets', 'favicon.ico'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|mp4|woff|woff2|ico)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: BUILD_PATH,
    port: process.env.DEV_SERVER_PORT || 8080,
  },
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // contenthash isn't available when hot reloading.
    config.output.filename = '[name].[hash].js';
  }

  return config;
};
