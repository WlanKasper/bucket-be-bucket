# How to start
MongoDB for Mac
```bash
brew tap mongodb/brew
brew update
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

Project start
```bash
npm i
npm run start
```
# How to deploy
On server run
```bash
npm run build
pm2 --name "eventus.server.laryokkk.com" start dist/main.js
```