export var SendState;
(function (SendState) {
    SendState[SendState["New"] = 1] = "New";
    SendState[SendState["Sent"] = 2] = "Sent";
    SendState[SendState["Delivered"] = 3] = "Delivered";
    SendState[SendState["Viewed"] = 4] = "Viewed";
})(SendState || (SendState = {}));
