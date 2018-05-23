const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '口袋妖怪',
      template: 'index.tpl.html'
    })
  ],
  module: {
    rules: [{
      test: /\.html$/,
      loader: 'raw-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, 
    {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      use: ['file-loader']
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader'
          }
        }
      ]
    }
  ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};