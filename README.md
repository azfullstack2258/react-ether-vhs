# Explore Blocks

A small app to explore the latest blocks on Ethereum.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


**Configure app**

* In `src/config.js` file, replace environment variables with your own. e.g. `INFURA_KEY`

## Libraries & Services
- [Web3.js v1.2.2](https://web3js.readthedocs.io/en/v1.2.2/)
  * In order to reduce the amount of network request web3, it used [BatchRequests](https://web3js.readthedocs.io/en/v1.2.2/web3-eth.html#batchrequest)
- [INFURA - Ethereum & IPFS APIs](https://infura.io)

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install packages.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
