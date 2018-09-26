const admin = require('./admin')
const credentials = require('./credentials')
const generator = require('generate-password')

const uId = 'test'
const rnd = generator.generate({ length: 3, numbers: true })
credentials(uId).setEmail(`test${rnd}@test.com`)
credentials(uId).setFramework('bbot')
credentials(uId).generateUsername()
credentials(uId).generatePassword()
const cred = credentials(uId).generateRoom()

admin.createAccounts(credentials(uId).toObject())

const config = {
  'botUsername': 'richMessageTestbotqusbot',
  // 'botUsername': 'richmessagebot',
  'messageWaitTimeout':10000,
  'tabOpenTimeout':200,
  'imageLoadTimeout':8000,
  'pageOpenTimeout':20000,
  'botRoomUrl':`https://bots.rocket.chat/direct/richMessageTestbotqusbot`,
  // 'botRoomUrl':`https://bots.rocket.chat/direct/richmessagebot`,
  'username': cred.user.username,
  'password': cred.user.password
}

require('chromedriver');
var {Builder, By, Key, until} = require('selenium-webdriver');
var driver = new Builder()
  .forBrowser('chrome')
  .build();
const assert = require('assert');

// const config = require('./test/config');
// const tests = require('./test/tests');

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
    } catch(e) {
      console.log("Tests failed");
      console.log(e);
    }     
  })
  after(() => {
    driver.quit();
  });
  it('module exports function to create new credentials', async () => {
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
  })
})

let tests = [];

// test 1
tests.push({
  "name":" Text Button With Url",
  "message":"text button with url",
  "validate": async function(lastMessage) {
    const buttons = await lastMessage.findElements(By.className('text-button'));

    assert.equal(buttons.length, 1);
    console.log("- asserted one button")

    console.log("- click button");
    await buttons[0].click();
    //await driver.sleep(config.tabOpenTimeout);

    const windowHandles = await driver.getAllWindowHandles();
    assert.equal(windowHandles.length, 2);
    console.log("- asserted new tab open");

    //console.log("- switch driver to new tab")
    await driver.switchTo().window(windowHandles[1]);
    
    //console.log("- determine URL of new tab");
    //const url = await driver.getCurrentUrl();
    //assert(url.indexOf('kayak')>=0);
    //console.log("- assert URL of new tab");
    await driver.close();
    await driver.switchTo().window(windowHandles[0]);
    return 
  }
});

// test 2
tests.push({
  "name":"Text Button With Msg in Chat Window",
  "message":"text button with msg in chat window",
  "validate": async function(lastMessage) {
    let buttons = await lastMessage.findElements(By.className('text-button'));

    assert.equal(buttons.length, 1);
    console.log("- asserted one button")

    console.log("- click button");
    
    await buttons[0].click();
    const lastMessageSelector = '.message:last-child [data-username="'+config.botUsername+'"]';
    await driver.wait(until.elementLocated(By.css(lastMessageSelector)), config.messageWaitTimeout);

    const newLastMessage = await driver.findElement(By.css('.message:last-child'));
    const newLastMessageBy = await lastMessage.getAttribute('data-username');
    assert.equal(newLastMessageBy, config.botUsername);
    console.log("- asserted new last messaage by Bot");

    const newLastMessageBody = await newLastMessage.findElement(By.css('.body'));
    const text = await newLastMessageBody.getText();
    assert.equal(text, "received your ‘hello in chat window’");
    console.log("- assert content of new last message.");
    return
  }
});


// test 3
tests.push({
  "name":"Image Button With Url",
  "message":"image button with url",
  "validate": async function(lastMessage) {
    let imageButtons = await lastMessage.findElements(By.className('image-button'));

    assert.equal(imageButtons.length, 1);
    console.log("- assert one button")

    const tagName = await imageButtons[0].getTagName();
    assert.equal(tagName, 'img');
    console.log("- assert button is image");

    await driver.sleep(config.imageLoadTimeout);
    await imageButtons[0].click();
    console.log("- click button");
    await driver.sleep(config.tabOpenTimeout);

    const windowHandles = await driver.getAllWindowHandles();
    assert.equal(windowHandles.length, 2);
    console.log("- assert new tab open");

    console.log("- switch driver to new tab.")
    await driver.switchTo().window(windowHandles[1]);

//    console.log("- determine the URL of new tab.");
//    let url = await driver.getCurrentUrl();
//    assert(url.indexOf('kayak')>=0);
//    console.log("- assert URL of new tab");
    await driver.close();
    await driver.switchTo().window(windowHandles[0]);

    return
  }
});


// test 4
tests.push({
  "name":"Image Button With Msg in Chat Window",
  "message":"image button with msg in chat window",
  "validate": async function(lastMessage) {
    let imageButtons = await lastMessage.findElements(By.className('image-button'));

    assert.equal(imageButtons.length, 1);
    console.log("- assert one button")

    const tagName = await imageButtons[0].getTagName();
    assert.equal(tagName, 'img');
    console.log("- assert button is image");

    
    await imageButtons[0].click();
    console.log("- click button");

    const lastMessageSelector = '.message:last-child [data-username="'+config.botUsername+'"]';
    await driver.wait(until.elementLocated(By.css(lastMessageSelector)), config.messageWaitTimeout);

    const newLastMessage = await driver.findElement(By.css('.message:last-child'));
    const newLastMessageBy = await lastMessage.getAttribute('data-username');
    assert.equal(newLastMessageBy, config.botUsername);
    console.log("- asserted new last messaage by Bot");

    const newLastMessageBody = await newLastMessage.findElement(By.css('.body'));
    const text = await newLastMessageBody.getText();
    assert.equal(text, "received your response about clicking the airplane");
    console.log("- assert content of new last message.");
    return
  }
});


// test 5
tests.push({
  "name":"Multiple Text Buttons",
  "message":"multiple text buttons",
  "validate": async function(lastMessage) {
    const buttons = await lastMessage.findElements(By.className('text-button'));
    assert.equal(buttons.length, 2);
    console.log("- assert two buttons")
//    const urls = ['kayak', 'example'];

    for(let i=0;i<buttons.length; i++) {
      let button = buttons[i];
      console.log("- click button "+(i+1));
      await button.click();
      await driver.sleep(config.tabOpenTimeout);

      windowHandles = await driver.getAllWindowHandles();
      assert.equal(windowHandles.length, 2);
      console.log("  - assert new tab open");

      console.log("  - switch driver to new tab.")
      await driver.switchTo().window(windowHandles[1]);

//      console.log("  - determine the URL of new tab.");
//      url = await driver.getCurrentUrl();
//      assert(url.indexOf(urls[i])>=0);
//      console.log("  - assert URL of new tab");
      await driver.close();
      await driver.switchTo().window(windowHandles[0]);
    }
    return 
  }
});

// test 6
tests.push({
  "name":"Horizontal Text Buttons",
  "message":"horizontal text buttons",
  "validate": async function(lastMessage) {
    const buttons = await lastMessage.findElements(By.className('text-button'));
    assert.equal(buttons.length, 2);
    console.log("- assert two buttons")

    await lastMessage.findElement(By.css('.action.horizontal-buttons'));
    console.log("- assert horizontal buttons");

//    const urls = ['kayak', 'example'];

    for(let i=0;i<buttons.length; i++) {
      let button = buttons[i];
      console.log("- click button "+(i+1));
      await button.click();
      await driver.sleep(config.tabOpenTimeout);

      windowHandles = await driver.getAllWindowHandles();
      assert.equal(windowHandles.length, 2);
      console.log("  - assert new tab open");

      console.log("  - switch driver to new tab.")
      await driver.switchTo().window(windowHandles[1]);

//      console.log("  - determine the URL of new tab.");
//      url = await driver.getCurrentUrl();
//      assert(url.indexOf(urls[i])>=0);
//      console.log("  - assert URL of new tab");
      await driver.close();
      await driver.switchTo().window(windowHandles[0]);
    }
    return 
  }
});


// test 12
tests.push({
  "name":"Attachment with title, image, link and buttons",
  "message":"attachment with buttons",
  "validate": async function(lastMessage) {
    // Assert title
    const title = await lastMessage.findElement(By.className('attachment-title'));
    const titleLink = await title.findElement(By.css('a'));
    const titleText = await title.getText();
    assert.equal(titleText, 'Lauri M(title field)');
    console.log("- assert title text");

    // Assert title link
    console.log("- click title link.")
    await titleLink.click();
    await driver.sleep(config.tabOpenTimeout);

    let windowHandles = await driver.getAllWindowHandles();
    assert.equal(windowHandles.length, 2);
    console.log("- assert new tab open");

    console.log("- switch driver to new tab.")
    await driver.switchTo().window(windowHandles[1]);

//    console.log("- determine the URL of new tab.");
//    let url = await driver.getCurrentUrl();
//    assert(url.indexOf('basketball-reference')>=0);
//    console.log("- assert URL of new tab");
    await driver.close();
    await driver.switchTo().window(windowHandles[0]);
    

    // Assert text
    const text = await lastMessage.findElement(By.className('attachment-text')).getText();
    assert.equal(text, 'Should have been rookie of the year (text field)');
    console.log("- assert text");

    // Assert image  
    const image = await lastMessage.findElement(By.className('attachment-image')).findElement(By.css('img'));
    console.log("- assert image attachment");

    // Assert buttons
    const buttons = await lastMessage.findElements(By.className('text-button'));
    assert.equal(buttons.length, 2);
    console.log("- assert two buttons")

    for(let i=0;i<buttons.length; i++) {
      let button = buttons[i];
      console.log("- click button "+(i+1));
      await button.click();
      await driver.sleep(config.tabOpenTimeout);

      windowHandles = await driver.getAllWindowHandles();
      assert.equal(windowHandles.length, 2);
      console.log("  - assert new tab open");

      console.log("  - switch driver to new tab.")
      await driver.switchTo().window(windowHandles[1]);

//      console.log("  - determine the URL of new tab.");
//      url = await driver.getCurrentUrl();
//      assert(url.indexOf('kayak')>=0);
//      console.log("  - assert URL of new tab");
      await driver.close();
      await driver.switchTo().window(windowHandles[0]);
    }

    return 
  }
});
