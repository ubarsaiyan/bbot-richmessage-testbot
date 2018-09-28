const admin = require('./admin');
const credentials = require('./credentials');
const generator = require('generate-password');

const uId = 'test';
const rnd = generator.generate({ length: 3, numbers: true });
credentials(uId).setEmail(`test${rnd}@test.com`);
credentials(uId).setFramework('bbot');
credentials(uId).generateUsername();
credentials(uId).generatePassword();
const cred = credentials(uId).generateRoom();

var json = JSON.stringify(cred.toObject());
const fs = require('file-system');
fs.writeFile('credentials.json', json, 'utf8');

admin.createAccounts(cred.toObject());