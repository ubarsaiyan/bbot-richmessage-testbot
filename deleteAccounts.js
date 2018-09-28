const admin = require('./admin');
const credentials = require('./credentials');

admin.deleteAllUsersExceptAdmin();
credentials('RESET');