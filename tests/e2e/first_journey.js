module.exports = {
  '새니티 테스트': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .assert.titleContains('UGLY CALENDAR')
      .end();
  } 
}