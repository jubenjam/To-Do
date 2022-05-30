# TaskTime

# CI
Backend:[![Node.js CI](https://github.com/jubenjam/expressjs-backend/actions/workflows/node.js.yml/badge.svg)](https://github.com/jubenjam/expressjs-backend/actions/workflows/node.js.yml)<br/>
Frontend:[![Node.js CI](https://github.com/jubenjam/react-frontend/actions/workflows/node.js.yml/badge.svg)](https://github.com/jubenjam/react-frontend/actions/workflows/node.js.yml)<br/>
Backend: https://github.com/jubenjam/expressjs-backend/actions<br/>
Frontend: https://github.com/jubenjam/react-frontend/actions<br/>
Backend CD: https://task-time-csc307.herokuapp.com/

# Project Blurb
Task Time is a to-do list website that allows you to organize and prioritize your daily tasks. Each user can create tasks, assign them a category, and select a date to complete the task by. The tasks can be sorted by date, allowing users to prioritize closer deadlines. Users can also filter based on the categories they created, allowing those with extremely busy lives to find what they have to do with ease.

# UI Prototype
https://www.figma.com/proto/GzNI1ebsantKEFbFjzt6nE/Task-Time?node-id=1%3A12&starting-point-node-id=1%3A12<br/>
Last Updated: April 25

# Diagrams
Use Case Diagram: https://github.com/jubenjam/To-Do/wiki/Use-Case-Diagram<br/>
Class Diagram: https://github.com/jubenjam/To-Do/wiki/Class-Diagram

# Development environment set up

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

Install the following in the frontend:<br/>
npm install axios bootstrap react-bootstrap react-router-dom

Install the following in the backend:<br/>
npm install mongoose
