# TaskTime

Backend:[![Node.js CI](https://github.com/jubenjam/expressjs-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/jubenjam/expressjs-backend/actions/workflows/node.js.yml)<br/>
Frontend:[![Node.js CI](https://github.com/jubenjam/react-frontend/actions/workflows/node.js.yml/badge.svg)](https://github.com/jubenjam/react-frontend/actions/workflows/node.js.yml)

#Project Blurb

#UI Prototype
https://www.figma.com/proto/GzNI1ebsantKEFbFjzt6nE/Task-Time?node-id=1%3A12&starting-point-node-id=1%3A12
Last Updated: April 25

#Diagrams
Use Case Diagram:
Class Diagram:

#Development environment set up

Use ESLint and Prettier extensions on vscode (separate extensions)

You WILL need to (for both frontend and backend):<br/>
npm install eslint @babel/core @babel/eslint-parser --save-dev<br/>
npm install prettier

BACKEND TESTING:<br/>
In BACKEND folder:<br/>
npm install --save-dev jest babel-jest @babel/core @babel/preset-react<br/>
to run tests:<br/>
./node_modules/.bin/jest --coverage --forceExit

You may need to:<br/>
npm install eslint

.prettierrc and .eslint.json will have all formatting rules
