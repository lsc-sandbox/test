export var StreamState;
(function (StreamState) {
    StreamState[StreamState["New"] = 1] = "New";
    StreamState[StreamState["Connected"] = 2] = "Connected";
    StreamState[StreamState["Disconnected"] = 3] = "Disconnected";
})(StreamState || (StreamState = {}));
