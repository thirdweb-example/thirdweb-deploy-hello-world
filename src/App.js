import {
  useAddress,
  useDisconnect,
  useMetamask,
  useContract,
} from "@thirdweb-dev/react";

import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  // Get the smart contract
  const { contract } = useContract(
    "0x83EA59613422752A37400473380723C85e2F7122"
  );

  // Function to read the message from the blockchain
  const [currentMessage, setCurrentMessage] = useState("");

  // On component mount, read the message from the contract
  useEffect(() => {
    async function readMessage() {
      const msg = await contract?.call("get");
      setCurrentMessage(msg);
    }

    if (contract) {
      readMessage();
    }
  }, [contract]);

  // Store the new message the user enters in the input in state
  const [newMessage, setNewMessage] = useState("");

  // Function to write the new message to the blockchain
  async function writeMessage() {
    if (!address) return;

    await contract?.call("set", newMessage);
  }

  return (
    <div>
      {address ? (
        <>
          <a onClick={disconnectWallet} className="btn2">
            Disconnect Wallet
          </a>

          {/* Display current message */}
          <p>
            Current message: <b>{currentMessage}</b>
          </p>

          {/* Add a new message */}
          <input
            type="text"
            value={newMessage}
            className="input"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={writeMessage} className="btn">
            Write Message
          </button>
        </>
      ) : (
        <button onClick={connectWithMetamask} className="btn">
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default App;
