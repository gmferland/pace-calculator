const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  entry: {
    extension: './src/extension/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist/extension'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'extension',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/extension/index.html',
    }),
  ],
});
