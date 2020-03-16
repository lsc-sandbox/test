export var ClientState;
(function (ClientState) {
    ClientState[ClientState["New"] = 1] = "New";
    ClientState[ClientState["Connecting"] = 2] = "Connecting";
    ClientState[ClientState["Connected"] = 3] = "Connected";
    ClientState[ClientState["Disconnected"] = 4] = "Disconnected";
})(ClientState || (ClientState = {}));
