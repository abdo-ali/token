import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    var owner : Principal = Principal.fromText("imnip-motn2-ct3w5-thnbc-k5wfd-bxy36-niaxz-ybypr-bdrqt-nbxq4-2ae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DTAN";
    
    var balances  = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

    public query func balanceOf(account : Principal) : async Nat {
        let balance = switch (balances.get(account)) {
            case (null) { 0 };
            case (?result) { result };
        };
        return balance;
    };
    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut () : async Text {
        // Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null) {

            let amountToPay : Nat = 10000;
            let result = await transfer(msg.caller, amountToPay);
            return result;
        }else{
            return "Already claimed";
        }
    };

    public shared(msg) func transfer(to : Principal, amount : Nat) : async Text {
        let from = msg.caller;
        Debug.print(debug_show(msg.caller));
        
        let fromBalance = await balanceOf(from);

        if (fromBalance > amount) {
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(from, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance : Nat = toBalance + amount;
            balances.put(to, newToBalance);

            return "success";
        } else {
            return "Insufficient Balance";
        };
    };
};