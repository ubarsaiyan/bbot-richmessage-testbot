require('chromedriver');
var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
const assert = require('assert');

global.driver;

const config = require('./test/config');
const tests = require('./test/tests');

describe('richmessages testing', () => {
  before(async () => {
    console.log("Webdriver start")
    try {
      await driver.get(config.botRoomUrl);
      console.log("Initial Page load");

      await driver.wait(until.elementLocated(By.id('emailOrUsername')), config.pageOpenTimeout);
      console.log("Login element render");

      await driver.findElement(By.id('emailOrUsername')).sendKeys(config.username);
      await driver.findElement(By.id('pass')).sendKeys(config.password, Key.RETURN);
      await driver.wait(until.elementLocated(By.className('rc-message-box__textarea')), config.pageOpenTimeout);
      console.log("Message Textarea render\n");

      const messageTextArea = await driver.findElement(By.className('rc-message-box__textarea'));

      for (var i=0; i<tests.length; i++){
        console.log("Run test: "+tests[i].name);
        let message = tests[i].message;
        await messageTextArea.sendKeys(message, Key.RETURN);
        console.log('- message sent to bot');
        const lastMessageSelector = '.message:last-child [data-username="'+config.botUsername+'"]';
        await driver.wait(until.elementLocated(By.css(lastMessageSelector)), config.messageWaitTimeout);
        console.log('- recieved reply from bot');
        let lastMessage = await driver.findElement(By.css('.message:last-child'));
        let lastMessageBy = await lastMessage.getAttribute('data-username');
        assert.equal(lastMessageBy, config.botUsername);
        await tests[i].validate(lastMessage);
        console.log("Passed\n");
      }
      console.log("Successfully passed all tests!");
    } catch(e) {
      console.log("Tests failed");
      console.log(e);
    } finally {
      await driver.quit();
    }
    
  })
  it('module exports function to create new credentials', () => {
    const credential = credentials('111')
    expect(credential.constructor.name).to.equal('Credentials')
  })
})
