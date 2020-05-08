#!/usr/bin/env node
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const spawn = require('cross-spawn');

const devServer = new webpackDevServer(webpack(config), { quiet: true });

devServer.listen('8080', '0.0.0.0', () => {
  devServer.compiler.hooks.done.tap('stats', () => {
    const result = spawn.sync('npx', ['nightwatch'], { stdio: 'inherit' });
    if (result.status === 0) {
      devServer.close();
    }
  });
});