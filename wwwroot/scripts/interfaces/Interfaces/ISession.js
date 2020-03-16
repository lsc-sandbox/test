export var SessionState;
(function (SessionState) {
    SessionState[SessionState["New"] = 0] = "New";
    SessionState[SessionState["Connecting"] = 1] = "Connecting";
    SessionState[SessionState["Connected"] = 2] = "Connected";
    SessionState[SessionState["Terminated"] = 3] = "Terminated";
})(SessionState || (SessionState = {}));
