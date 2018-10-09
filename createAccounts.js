const admin = require('./admin');
const credentials = require('./credentials');
const generator = require('generate-password');
require('dotenv').config();
require('./richmessage.js');

const uId = 'test';
const rnd = generator.generate({ length: 3, numbers: true });
credentials(uId).setEmail(`test${rnd}@test.com`);
credentials(uId).setFramework(process.env.BOT_FRAMEWORK);
credentials(uId).generateUsername();
credentials(uId).generatePassword();
const cred = credentials(uId).generateRoom();

var json = JSON.stringify(cred.toObject());
const fs = require('file-system');
fs.writeFile('credentials.json', json, 'utf8');

admin.createAccounts(cred.toObject());
setTimeout(function () { //TODO: Replace setTimeout by a callback function
    if (process.env.BOT_FRAMEWORK === 'bbot') {
        const bBot = require('bbot');
        bBot.start();
    }
}, 5000);