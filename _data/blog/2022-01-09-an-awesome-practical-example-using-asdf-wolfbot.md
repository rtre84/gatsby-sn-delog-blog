---
template: BlogPost
path: /2021-08-18__wolfbot
date: 2022-01-09T06:27:21.523Z
title: 'An Awesome Practical Example using asdf: Wolfbot'
thumbnail: /assets/stock-market-6531146_1280.jpeg
---
**DISCLAIMER**: This is NOT financial advice.

The material in this article is provided for informational purposes only and does not constitute an offer to sell, a solicitation to buy, or a recommendation or endorsement for any security or strategy, nor does it constitute an offer to provide investment advisory services by Servingniches or me.

Now that we got that out of the way ...

For the previous article on installing asdf   
https://servingniches.org/posts/2021-08-14__the_greatest_package_manager/

### The Good Stuff

So the project that we're looking to install or use as an example for this is Wolfbot.
You can find it at https://github.com/Ekliptor/WolfBot . 

Feel free to install a repo or project 
closer to your heart. You will have to modify the asdf plugin steps to match 
your language or tech of choice but it will be similar and not too painful. If 
you're dealing with a relatively major programming language, then you will 
be fine. Otherwise, write your own plugin to support it in asdf. It's 
relatively easy and you get brownie points for it. I'd say go for it.

### Wolfbot is a cryptocurrency trading bot.

Here are some features of the Wolfbot:

- Trading: buying + selling, portfolio management (sync balances with exchanges)
- Margin Trading: leveraged trading including short selling and futures trading
- Arbitrage: profit from price differences between 2 exchanges (done "on the books" with balances on both exchanges, no withdrawals from exchanges required)
- Lending: lend your coins on the lending market of supported crypto exchanges for the highest possible interest rates
- Backtesting: test your trade strategies in simulation on historical data
- Web Plugins: Access social media data from Twitter, Reddit, Telegram Channels, RSS Feeds,... to trade based on news and real world events (not part of open source version yet)


Git clone the repo.

```bash
git clone https://github.com/Ekliptor/WolfBot
```

### Using asdf to install and setup dependencies

Since we've discussed the steps in detail previously, I've left out verbose 
explanations. 

To get Wolfbot up and running, we will need. Copy pasted from https://github.com/Ekliptor/WolfBot
- NodeJS >= 12 && <= 14
- MongoDB >= 4.0
- TypeScript >= 3.5
- yarn >= 1.9.4 (npm should work too, but no support given if you run into errors)
- Webpack >= 4 (only for UI modifications)

```shell
cd Wolfbot
asdf current # to see what versions are being used in this directory
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git 
asdf install nodejs 14.17.5
asdf local nodejs 14.17.5
asdf plugin add golang https://github.com/kennyp/asdf-golang.git
asdf install golang 1.15
asdf local golang 1.15
# For local mongodb development, you can get away with this setup.
# Don't use asdf for production
asdf plugin add mongodb https://github.com/sylph01/asdf-mongodb.git
asdf plugin add mongosh https://github.com/itspngu/asdf-mongosh.git
asdf install mongodb latest
asdf install mongosh latest
asdf local mongodb 5.0.2
asdf local mongosh 1.0.5
# For more details: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
# If a brand new installation on an Apple M1 Mac
mkdir -p /opt/homebrew/var/log/mongodb
mkdir -p /opt/homebrew/var/mongodb
touch /opt/homebrew/etc/mongod.conf
```

Open a new tab for the below command. The below command starts up mongodb in the foreground.

```shell
mongod --dbpath /opt/homebrew/var/mongodb # starts up the mongo db in foreground
```

Rename the ```configLocal-sample.ts``` in the Wolfbot directory 
to ```configLocal.ts```. Edit the configLocal.ts file.

Add in your mongodb url in the mongo url section of the file.

```shell
mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
```

Setup Yarn

```shell
asdf plugin add yarn https://github.com/twuni/asdf-yarn.git
asdf install yarn latest
asdf local yarn 1.22.11
```

Final steps to run everything installed so far.

```shell
yarn install
yarn tsc # to compile all TypeScript files. Ignore the errors. Press Ctrl-C once you see the watch message.
# the default node_module download for this particular package doesn't 
# seem to have a build directory so we're building one
yarn tsc --project node_modules/@ekliptor/bit-models/tsconfig.json # to compile all TypeScript files. Ignore the errors. Press Ctrl-C once you see the watch message. 
# Finally to run the bot
node build/app.js --debug --config=WhaleWatcher.json --trader=RealTimeTrader --noUpdate --noBrowser
```

You will additional configuration like api keys for various exchanges to get the bot 
running fully but the above was meant to get the bot in a runnable state.

### Appendix

[Pixabay Image Source](https://pixabay.com/photos/stock-market-trading-stocks-6531146/)
© 2022
