const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const porta = 9001;

module.exports = {
  entry: './src/javascript/index.js', // Arquivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
    filename: 'bundle.js', // Arquivo JavaScript gerado
    publicPath: '/', // Caminho absoluto para os assets gerados
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Processa arquivos CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/, // Processa imagens
        type: 'asset/resource',
      },
      {
        test: /\.html$/, // Processa arquivos HTML (caso precise importar partes deles)
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Para HMR (Hot Module Replacement) em desenvolvimento
    // Cria o index.html com injeção automática do bundle e dos assets processados
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/contact.html',
      filename: 'contact.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/formation.html',
      filename: 'formation.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/skills.html',
      filename: 'skills.html',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: './public/projects.html',
      filename: 'projects.html',
      inject: true,
    }),


    // Copia os arquivos estáticos da pasta public para o diretório de saída,
    // ignorando os HTMLs que já foram processados pelo HtmlWebpackPlugin
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
          to: '.',
          globOptions: {
            ignore: [
              '**/index.html',
              '**/contact.html',
              '**/formation.html',
              '**/skills.html',
              '**/projects.html',

            ],
          },
        },
        
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',     // Nome do arquivo CSS principal
      chunkFilename: '[id].css',  // Nome dos chunks, se houver
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve os arquivos do diretório de saída (dist)
    port: porta,                             // Porta do servidor
    open: true,                              // Abre o navegador automaticamente
    hot: true,                               // Ativa o HMR
  },
  mode: 'development',
};
