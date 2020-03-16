export var SwitchDevicePolicy;
(function (SwitchDevicePolicy) {
    SwitchDevicePolicy[SwitchDevicePolicy["DontSwitch"] = 1] = "DontSwitch";
    SwitchDevicePolicy[SwitchDevicePolicy["SwitchAndSwitchBack"] = 2] = "SwitchAndSwitchBack";
    //and then switch back if the original device becomes available. NEEDED?.
    SwitchDevicePolicy[SwitchDevicePolicy["SwitchAndDontSwitchBack"] = 3] = "SwitchAndDontSwitchBack"; //Switch to another available device of the same type when the current source device is unplugged 
    //and then switch back if the original device becomes available. NEEDED?.
})(SwitchDevicePolicy || (SwitchDevicePolicy = {}));
