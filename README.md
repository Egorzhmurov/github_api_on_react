# GitHub API on React

A small React application that searches GitHub profiles and displays public user data using the GitHub API.

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- Node.js 18 or later
- npm (comes with Node.js)
- Git

## Step 1: Clone the repository

```bash
git clone https://github.com/Egorzhmurov/github_api_on_react.git
cd github_api_on_react
```

## Step 2: Install dependencies

```bash
npm install
```

This will install all required packages used by the app, including React, webpack, Babel, and the development server.

## Step 3: Start the development server

```bash
npm start
```

This will run the project in development mode and start the webpack dev server.

After the server starts successfully, open the app in your browser:

```text
http://localhost:3000
```

## Step 4: Build for production

To create an optimized production build, run:

```bash
npm run build
```

The final output will be generated in the `dist` folder.

## Useful commands

```bash
npm start   # start the local development server
npm run build   # create a production build
```

## Troubleshooting

- If `npm start` fails because a command is not found, make sure Node.js and npm are installed correctly.
- If the browser does not open automatically, open `http://localhost:3000` manually.
- If dependencies fail to install, try deleting `node_modules` and running `npm install` again.

## Project stack

- React
- Webpack
- Babel
- GitHub REST API

## License

This project is licensed under the ISC License.
