import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import Transactions from "./Transactions";
import Accounts from "./Accounts";

import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState("");
  const [blockInfo, setBlockInfo] = useState();
  const [showTransactions, setShowTransactions] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    async function getBlockNumber() {
      try {
        setBlockNumber(await alchemy.core.getBlockNumber());
      } catch {
        console.log("1)What");
      }
    }

    async function getBlockInfo() {
      try {
        setBlockInfo(await alchemy.core.getBlock(blockNumber));
      } catch {
        console.log("1)What");
      }
    }
    getBlockNumber();
    getBlockInfo();
  }, [blockNumber]);

  return (
    <div className="App">
      <div>
        <h2>ETH Xplorer</h2>
      </div>
      <div className="intro">
        <div>
         Latest Block: {blockInfo === undefined ? "Loading..." : blockNumber}
        </div>
        <br></br>
        <div>
         Block Timestamp:{" "}
          {blockInfo === undefined
            ? "Loading..."
            : new Date(blockInfo.timestamp * 1_000).toLocaleString() }
        </div>
        <br></br>
        <div>
         No. of Transactions:{" "}
          {blockInfo === undefined
            ? "Loading..."
            : blockInfo.transactions.length}
        </div>
        <br></br>

        <div>
          Gas Used:{" "}
          {blockInfo === undefined
            ? "Loading..."
            : parseInt(blockInfo.gasUsed._hex)}
        </div>
        <br></br>
        <div>
        <button
          onClick={() => {
            setBlockNumber("Loading...");
          }}
        >
          Refresh Stats
        </button>
        </div>

        <br></br>
        <div>
        <button
          onClick={() => {
            setShowTransactions(!showTransactions);
          }}
        >
          Block Transactions
        </button>
        </div>

        <br></br>
        <div>
        <button
          onClick={() => {
            setShowAccount(!showAccount);
          }}
        >
          Address Lookup
        </button>
        </div>
      </div>
      {showAccount ? <Accounts /> : <div></div>}
      {showTransactions ? (
        <Transactions txs={blockInfo.transactions} />
      ) : (
        <div></div>
      )}
     
    </div>
  );
}

export default App;
