const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    extension: './src/extension/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist/extension'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          'css-loader',
        ],
      },
    ],
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
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
    }),
  ],
};
