import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [recipientid, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [feedBack, setFeedBack] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  async function handleClick() {
    setIsHidden(true);
    setIsDisabled(true);
    const principalId = Principal.fromText(recipientid);
    const amountNum = Number(amount);

    console.log(
      "Transfer Button Clicked: " + recipientid + " Amount: " + amountNum
    );
    /*
    ##############  uncomment to use inernet identity  ##############
    const authClient = await AuthClient.create();
    const identity = authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    let result = await authenticatedCanister.transfer(principalId, amountNum);
    */
    //##############  comment line after to use inernet identity  ##############
    let result = await token.transfer(principalId, amountNum);

    setFeedBack(result);
    setIsHidden(false);
    setIsDisabled(false);
    console.log(result);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientid}
                onChange={(e) => setRecipientId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p>{feedBack}</p>
      </div>
    </div>
  );
}

export default Transfer;
