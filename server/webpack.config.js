const path = require('path');

const ReloadServerPlugin = require('reload-server-webpack-plugin');
const webpack = require('webpack');

const WebpackNodeExternals = require('webpack-node-externals');

const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: {
    server: ['./src/index.js'],
  },
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
  },
  watch: true,
  target: 'node',
  externals: [
    WebpackNodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  resolve: {
    modules: [path.resolve(cwd, 'src')],
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/],
        include: [path.resolve(cwd, 'src')],
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'index.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
