# Hello world with thirdweb deploy

## Introduction

This example demonstrates a basic project utilizing the thirdweb SDK to interact with a simple contract deployed with [thirdweb deploy](https://portal.thirdweb.com/thirdweb-deploy).

We deploy a basic [HelloWorld](./HelloWorld.sol) smart contract using thirdweb deploy, containing a `get` and `set` function to view data stored in the smart contract, and interact with it using the [thirdweb React SDK](https://portal.thirdweb.com/react).

**Check out the Demo here**: https://thirdweb-deploy-hello-world.thirdweb-example.com/

## Tools

- [**thirdweb Deploy**](https://portal.thirdweb.com/thirdweb-deploy): Deploy our `HelloWorld.sol` smart contract with zero configuration by running `npx thirdweb deploy`.
- [**React SDK**](https://docs.thirdweb.com/react): to enable users to connect and disconnect their wallets with our website, and access hooks such as [useContract](https://portal.thirdweb.com/react/react.useContract) to interact with the contract.

## Using This Repo

- Create a copy of this repo by running the below command:

```bash
npx create-thirdweb-dapp --example thirdweb-deploy-hello-world
```

- Deploy the `HelloWorld.sol` smart contract by running the below command from the root of the project directory:

```bash
npx thirdweb deploy
```

- Configure the network you deployed in [`index.js`](./src/index.js):

```jsx
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;
```

- Run the project locally:

```bash
npm run start
```

## Guide

In this section, we'll dive into the code and explain how it works.

### Hello World Smart Contract

In [HelloWorld.sol](./HelloWorld.sol), we have a basic smart contract that has three key elements:

1. A `storedMessage` variable that stores a `string` inside the smart contract.
2. A `get` function that returns the value of `storedMessage`.
3. A `set` function that sets the value of `storedMessage` to a new value.

### Deploying with thirdweb deploy

We can easily deploy our smart contract with [thirdweb deploy](https://portal.thirdweb.com/thirdweb-deploy) without using our private key or any other configuration by running:

```bash
npx thirdweb deploy
```

This uploads the contract's ABI to IPFS and generates a link for us to deploy it on the [thirdweb dashboard](https://thirdweb.com/dashboard):

![generated dashboard url for deploy](https://cdn.hashnode.com/res/hashnode/image/upload/v1654143246209/YNmLBfD5K.png)

Now we choose the network we want to deploy our contract on:

![choose network](https://cdn.hashnode.com/res/hashnode/image/upload/v1654143228521/rD7iIvrez.png)

And can view how to call the contracts functions yb using the SDK:

![view contract functions](https://cdn.hashnode.com/res/hashnode/image/upload/v1654143515621/BJzzCv2Oy.png)

### Getting the contract in our code

We can get the contract address from the dashboard, and connect to our smart contract using the `useContract` hook:

```jsx
// Get the smart contract
const { contract } = useContract(
  "0x83EA59613422752A37400473380723C85e2F7122" // your contract address
);
```

### Reading Message from Smart Contract

To read the message stored on the smart contract, we call the `get` function:

```jsx
// Function to read the message from the blockchain
const [currentMessage, setCurrentMessage] = useState("");

useEffect(() => {
  async function readMessage() {
    const msg = await contract?.call("get");
    setCurrentMessage(msg);
  }

  if (contract) {
    readMessage();
  }
}, [contract]);
```

### Write Message to Smart Contract

To write a new message to the smart contract, we call the `set` function:

```jsx
// Store the new message the user enters in the input in state
const [newMessage, setNewMessage] = useState("");
```

```jsx
// Function to write the new message to the blockchain
async function writeMessage() {
  if (!address) return;

  await contract?.call("set", newMessage);
}
```

### User Interface

On the UI, we use a ternary operator to show the `Connect Wallet` button for users who have not yet connected their wallet to the site, or show a text input and a button for users to write new messages to the smart contract if they have connected their wallet.

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
