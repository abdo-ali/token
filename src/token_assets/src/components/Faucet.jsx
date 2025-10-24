import React from "react";
import { token } from "../../../declarations/token";

function Faucet() {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Gimme gimme");

  async function handleClick(event) {
    // event.preventDefault();
    setIsDisabled(true);
    let result = await token.payOut();
    setButtonText(result);
    console.log(result);
    // setIsDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free DAngela tokens here! Claim 10,000 DANG coins to your
        account.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
