const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const path = require('path');
const porta = 9000;

module.exports = {
  entry: './src/javascript/index.js', // Arquivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
    filename: 'bundle.js', // Nome do arquivo gerado
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Regras para processar arquivos CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/, // Regras para processar arquivos de imagem
        type: 'asset/resource', // Corrigido: era 'assets/resource'
      },
      {
        test: /\.html$/, // Processar arquivos HTML
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Plugin necessário para HMR
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        inject: true,
      }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Nome do arquivo CSS gerado
      chunkFilename: '[id].css', // Nome dos chunks (opcional)
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, ''), // Certifique-se de que aponta para 'dist'
    port: porta, // Porta do servidor
    open: true, // Abre automaticamente o navegador
    hot: true, // Habilita o Hot Module Replacement (HMR)
  },
  
  mode: 'development', // Certifique-se de que o modo é 'development'
};
