# TaskTime

[![Node.js CI](https://github.com/jubenjam/expressjs-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/jubenjam/expressjs-backend/actions/workflows/node.js.yml)

Use ESLint and Prettier extensions on vscode (separate extensions)

You WILL need to (for both frontend and backend):<br/>
npm install eslint @babel/core @babel/eslint-parser --save-dev<br/>
npm install prettier --global

You may need to:<br/>
npm install eslint

BACKEND TESTING:<br/>
In BACKEND folder:<br/>
npm install --save-dev jest babel-jest @babel/core @babel/preset-react<br/>
to run tests:<br/>
./node_modules/.bin/jest --coverage --forceExit

.prettierrc and .eslint.json will have all formatting rules
