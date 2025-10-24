import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";

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
};