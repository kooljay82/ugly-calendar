const chromedriver = require('chromedriver');
const selenium = require('selenium-server');
const geckodriver = require('geckodriver');

module.exports = {
  src_folders: ["tests/e2e"],
  selenium: {
    start_process: true,
    host: '127.0.0.1',
    port: 4444,
    server_path: selenium.path,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
      'webdriver.gecko.driver': geckodriver.path
    }
  },
  chrome: {
    desiredCapabilities: {
      browserName: 'chrome',
      javascriptEnabled: true,
      chromeOptions: {
        args: ['headless', 'no-sandbox']
      }
    }
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName : 'chrome',
        chromeOptions: {
          w3c: false
        },
      }
    }
  }
}