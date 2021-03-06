[create-user]: https://rocket.chat/docs/bots/creating-bot-users/
[configure-bot]: https://rocket.chat/docs/bots/configure-bot-environment/

![bRocket](https://cdn.glitch.com/f4b1ba17-30d5-4534-a30e-e61bb60f9d59%2FbRocket.png?1534485925380)

# Richmessage bot with acceptance tests

1. Set up a new user and channel on the RocketChat bots playground
1. Configure a new instance of the bot which is connected to the bot playground
1. Run an automated set of tests against the bot to test platform functionality and bot logic.

# How to run the bot?

+ Logon to [Rocket.Chat bot playground](https://bots.rocket.chat) and create an account for the bot. (You will need admin rights)
+ Assign the role `bot` while creating the bot account above. 
+ Clone this repository.
+ Run `npm install`.
+ Create a `.env` file according to the template below, replacing the credentials with the account created:
```
BOT_FRAMEWORK=bbot
ROCKETCHAT_URL=https://bots.rocket.chat
ROCKETCHAT_ROOM=general,richmessages
ROCKETCHAT_USE_SSL=true
ROCKETCHAT_USER=richmessagebot
ROCKETCHAT_PASSWORD=richmessager
RESPOND_TO_DM=true
RESPOND_TO_EDITED=false
```
+ Run `npm start` and interact with the bot on the bots playground.

# How to test?

+ No need to create bot or user accounts.
+ Create a `.env` file as above but you can leave out the `ROCKETCHAT_USER` and `ROCKETCHAT_PASSWORD` fields.
+ Google Chrome should be present on the system.
+ [Download Chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) and place executable on your system PATH.
+ Clone this repository.
+ Run `npm install`.
+ Run `npm test`.

`npm test` executes `node createAccounts.js & mocha ./*spec.js; node deleteAccounts.js`. `createAccounts.js` script creates the bot and user accounts on the remote Rocket.Chat server. Then the richmessage acceptance tests are run using Mocha and Selenium. `deleteAccounts.js` script deletes the bot and user accounts created earlier to make sure the server returns to its previous state.

# Bonus: Importing project's non-default branch from Github to Glitch

Use the import option to import the project to Glitch. This will clone only the `master` or default branch. To checkout to any other branch of your repo, fire up the Glitch console and run `git checkout --track origin/branchname` and Voila! The `branchname` branch is now running on Glitch. 