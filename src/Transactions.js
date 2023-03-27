import { Alchemy, Network } from "alchemy-sdk";
import { Utils } from "alchemy-sdk";
import { useState } from "react";
import MoreInfoTx from "./MoreInfoTx";

export const Transactions = (props) => {
  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  let [amount, setAmount] = useState(0);
  let [selectedIndex, setSelectedIndex] = useState(null);

  async function getMoreInfo(hash) {
    try {
      let response = await alchemy.core.getTransaction(hash);
      setFrom(response.from);
      setTo(response.to);
      setAmount(Utils.formatEther(parseInt(response.value._hex).toString()));
      setSelectedIndex(hash);
    } catch {
      alert("1)What");
    }
  }

  return (
    <div className="transactions">
      
      {props.txs.map((el, i) => {
        return (
          <ul key={i}>
            {el}{" "}
            <button
              onClick={() => {
                getMoreInfo(el);
              }}
            >
              Details
            </button>
            {selectedIndex === el && (
              <MoreInfoTx from={from} to={to} amount={amount} />
            )}
          </ul>
        );
      })}
    </div>
  );
};

export default Transactions;
