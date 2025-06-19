const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PORTA = 9000;

const pages = ['index', 'contact', 'formation', 'skills', 'projects', 'privacidade'];

const entryPoints = pages.reduce((acc, page) => {
  acc[page] = `./src/javascript/import/${page}.js`;
  return acc;
}, {});

module.exports = {
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'javascript/[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // processa .js e .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react', // para React/JSX
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // importar sem extensão
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...pages.map(page => new HtmlWebpackPlugin({
      template: `./src/html/${page}.html`,
      filename: `${page}.html`,
      inject: true,
      chunks: [page], // só inclui o JS daquela página
    })),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'assets',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: PORTA,
    open: true,
    hot: true,
  },
  mode: 'production',
};
