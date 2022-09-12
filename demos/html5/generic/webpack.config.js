//const path = require('path');
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    devServer: {
      open: true,
    },
    resolve: {
      modules: ['node_modules'],
    },
    module: {
      rules: [
        {
          // Rule to translate ES5 javascript files to ES6.
          test: /\.js$/,
          exclude: /node_modules\/(?!(@wiris\/mathtype-html-integration-devkit)\/).*/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env'],
            },
          },
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
        {
          // For the modal close, minimize, maximize icons
          test: /\.svg$/,
          use: ['raw-loader'],
        },
        {
          test: /\.html$/i,
          exclude: /node_modules/,
          loader: 'html-loader',
        },
      ],
    }
  });
};
