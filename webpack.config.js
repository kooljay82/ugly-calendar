/*
 * UGLY CALENDAR / 2020.03.25 / 임진호
 * 달력 모듈 개발, 결과물 확인 및 모듈 패키징을 위해 설정
 * dist는 프로덕션 빌드와 development 테스트를 위해 필요
 * lib는 모듈 번들링을 위해 필요
 * 필요한 설정이 있다면 수정 후 히스토리를 관리
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.resolve(__dirname, './src/js/index.js')],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'calendar.js',
    library: 'Ugly',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    inline: true,
    hot: true,
    port: 8080
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'calendar.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      inject: 'head'
    })
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(css|styl)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'stylus-loader' },
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: path.resolve(__dirname, '/img/')
        }
      }
    ]
  }
}