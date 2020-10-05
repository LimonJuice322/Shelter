const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: __dirname + "/pages/main/main.js",
    pets: __dirname + "/pages/pets/pets.js",
  }, // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: '[name].bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  module: {  // where we defined file patterns and their loaders
      rules: [
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        },
        {
          test: /\.(png|jpg)$/i,
          use: {
            loader: 'file-loader',
            query: {
              name: '[path][name].[ext]'
            }
          },
        },
        {
          test: /\.svg$/i,
          use: {
            loader: 'file-loader',
            query: {
              name: '[path][name].[ext]'
            }
          }
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        }
      ]
  },
  plugins: [  // Array of plugins to apply to build chunk
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlWebpackPlugin({
          template: __dirname + "/pages/main/main.html",
          chunks: ['main'],
          filename: './main.html',
          inject: 'body'
      }),
      new HtmlWebpackPlugin({
          template: __dirname + "/pages/pets/pets.html",
          chunks: ['pets'],
          filename: './pets.html',
          inject: 'body'
      })
  ],
  devServer: {  // configuration for webpack-dev-server
      contentBase: './',  //source of static assets
      port: 7700, // port to run dev-server
      open: true, // Open browser
      index: 'main.html'
  }
};
