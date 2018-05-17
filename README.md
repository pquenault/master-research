# Master Research

Web application to facilitate orientation in master's degree students of Computer Science of Champollion.

## Installation

### Required
- [MongoDB Community Edition v3.6.4](https://docs.mongodb.com/manual/administration/install-community/)
- [Node.js v8.11.1](https://nodejs.org/en/download/)
- [node-mongo-seeds](https://www.npmjs.com/package/node-mongo-seeds)

### Recommended
- [Atom](https://atom.io/)
- [Firefox](https://www.mozilla.org/fr/firefox/)
- [Git](https://git-scm.com/downloads)
- [http-server](https://www.npmjs.com/package/http-server)

## Setup

1. Install project dependencies both client and server side
```
~/master-research/client $ npm install
~/master-research/server $ npm install
```

2. Start MongoDB
```
~ $ sudo service mongod start
```

3. Seed project database named "mrdb"
```
~/master-research/database $ seed
```

## Run

1. Start MongoDB
```
~ $ sudo service mongod start
```

2. Run server-side code (i.e. nodejs express server)
```
~/master-research/server $ node index.js
```

3. Run client-side code (i.e. angularjs application)
```
~/master-research/client $ firefox index.html &
```

## How to

## Assets

### Palette
<!-- ![Palette](/client/assets/img/palette.svg "Palette") -->
<img src="/client/assets/img/palette.svg" alt="Palette" width="100%">
