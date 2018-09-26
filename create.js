const admin = require('./admin')
const credentials = require('./credentials')

const uId = 'test'
credentials(uId).setEmail('test12@rocket.chat')
credentials(uId).setFramework('bbot')
credentials(uId).generateUsername()
credentials(uId).generatePassword()
credentials(uId).generateRoom()

admin.createAccounts(credentials(uId).toObject())