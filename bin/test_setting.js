const spawn = require('cross-spawn');
console.log('빌드 환경에서 테스트')

spawn.sync('webpack-dev-server');