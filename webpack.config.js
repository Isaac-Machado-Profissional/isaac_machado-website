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
        test: /\.css$/, // Arquivos que terminam em .css
        use: ['style-loader', 'css-loader'], // Carrega estilos
      },
      {
        test: /\.(png|jpg|gif)$/, // Arquivos de imagem
        type: 'asset/resource',
      },
    ],
  },

  devServer: {
    static: path.resolve(__dirname, ''), // Pasta q vai catar
    port: porta, // Porta do servidor
    open: true, // Abre automaticamente o navegador
    hot: true // Habilita o Hot Module Replacement (HMR)

  },

  plugins: [],
  mode: 'development', // Modo: 'development' ou 'production'
};
