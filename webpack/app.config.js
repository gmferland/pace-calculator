const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    app: './src/app/index.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist/app'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/app'),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'app',
          test: /\.s?css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
    }),
  ],
};
