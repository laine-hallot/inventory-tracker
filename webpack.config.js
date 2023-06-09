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
    entry: './src/electron/start.ts',
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
    entry: './src/frontend/app.tsx',
    //target: 'electron-renderer',
    devtool: 'source-map',
    devServer: {
      hot: true,
      port: 8080,
      watchFiles: ['src/**/*.*'],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src/frontend/'),
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    resolve: { extensions: ['.ts', '.tsx', '.js'] },
    output: {
      path: __dirname + '/dist/web',
      asyncChunks: true,
      globalObject: 'globalThis',
      filename: 'react.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/frontend/index.html',
      }),
    ],
  },
];
