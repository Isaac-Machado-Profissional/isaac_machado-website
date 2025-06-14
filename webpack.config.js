const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const PORTA = 9000;

const pages = ['index', 'contact', 'formation', 'skills', 'projects'];

// Passo 1: Criar o objeto de pontos de entrada dinamicamente
const entryPoints = pages.reduce((acc, page) => {
  // Assumindo que o nome do JS é o mesmo do HTML
  acc[page] = `./src/javascript/import/${page}.js`;
  return acc;
}, {}); 

module.exports = {
  // Use o objeto de entradas que criamos
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'public'),
    // Passo 2: Use [name] para criar um bundle para cada entrada
    filename: 'javascript/[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]'
        }
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    // Passo 3: Diga a cada HTML qual chunk (JS) ele deve usar
    ...pages.map(page => new HtmlWebpackPlugin({
        template: `./src/html/${page}.html`,
        filename: `${page}.html`,
        inject: true,
        chunks: [page] // Conecta 'index.html' com 'index.bundle.js', e assim por diante.
      })
    ),

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
    static: [ {
        // Serve os arquivos estáticos do diretório 'public'
        directory: path.resolve(__dirname, 'public'),
        directory: path.resolve(__dirname, 'src/html'),
    }

    ],
    port: PORTA,
    open: true,
    hot: true,
  },
  mode: 'production',
};