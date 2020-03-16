const path = require('path');
const WebpackNodeExternals = require('webpack-node-externals');

const cwd = process.cwd();

module.exports = {
  mode: 'production',
  entry: {
    server: ['./src/index.js'],
  },
  output: {
    path: path.resolve('build'),
    filename: 'index.js',
  },
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
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
  plugins: [],
};
