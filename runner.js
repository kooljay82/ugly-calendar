const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');
const child = require('child_process');

const devServer = new webpackDevServer(webpack(config), { quiet: true });

devServer.listen('8080', '0.0.0.0');
devServer.compiler.hooks.done.tap('stats', () => {
  child.exec('nightwatch', (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return;
    }
    console.log(stdout);
    devServer.close();
  });
});