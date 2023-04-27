const HtmlWebpackPlugin = require('html-webpack-plugin');
const { IgnorePlugin } = require('webpack');
const path = require('path');

const optionalPlugins = [];
if (process.platform !== 'darwin') {
  optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
}

module.exports = [
  {
    mode: 'development',
    entry: './src/electron.ts',
    target: 'electron-main',
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    output: {
      path: __dirname + '/dist',
      filename: 'electron.js',
    },
    plugins: [...optionalPlugins],
  },
  {
    // watch: true,
    mode: 'development',
    entry: './src/app/app.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    devServer: {
      hot: true,
      port: 8080,
      watchFiles: ['src/app/**/*.*'],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [
            { loader: 'ts-loader' },
            // { loader: 'electron-reloader' },
            //{ loader: 'react-hot-loader/webpack' },
          ],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    output: {
      path: __dirname + '/dist',
      filename: 'react.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
  },
];
