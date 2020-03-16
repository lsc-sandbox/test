import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { SessionState } from "./interfaces/Interfaces/ISession.js";
import { DeviceManager } from "./interfaces/PrototypeImplementation/Consumables/DeviceManager.js";
class DeviceSwitching {
    constructor() {
        DeviceSwitching.video = document.getElementById('video');
        DeviceSwitching.video.style.display = 'block';
        DeviceSwitching.clientJoinButton = document.getElementById('clientJoin');
        DeviceSwitching.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
        DeviceSwitching.leaveConferenceButton = document.getElementById('leaveConference');
        DeviceSwitching.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
        DeviceSwitching.leaveConferenceButton.disabled = true;
    }
    joinConfererence() {
        let client = new Client();
        client.connect().then(() => {
            DeviceSwitching.conference = client.join({ conferenceId: "123123", videoSinkElementId: DeviceSwitching.video.id });
            DeviceSwitching.leaveConferenceButton.disabled = false;
            let audioDeviceList = document.getElementById('audioDeviceList');
            if (audioDeviceList) {
                audioDeviceList.options.length = 0;
            }
            let videoDeviceList = document.getElementById('videoDeviceList');
            if (videoDeviceList) {
                videoDeviceList.options.length = 0;
            }
            DeviceSwitching.conference.onStateChange = (_session, state) => {
                if (state == SessionState.Connected) {
                    let deviceManager = new DeviceManager();
                    deviceManager.getAudioInputDevices().then((devices) => {
                        let currentVideoId = DeviceSwitching.conference.me.deviceStream.microphone.deviceId;
                        devices.forEach((device) => {
                            var option = document.createElement('option');
                            option.value = device.deviceId;
                            option.text = device.label;
                            option.selected = (currentVideoId == device.deviceId);
                            audioDeviceList.add(option);
                        });
                    });
                    deviceManager.getVideoInputDevices().then((devices) => {
                        let currentVideoId = DeviceSwitching.conference.me.deviceStream.camera.deviceId;
                        devices.forEach((device) => {
                            var option = document.createElement('option');
                            option.value = device.deviceId;
                            option.text = device.label;
                            option.selected = (currentVideoId == device.deviceId);
                            videoDeviceList.add(option);
                        });
                    });
                    fm.liveswitch.Util.observe(audioDeviceList, 'change', function (evt) {
                        let option = audioDeviceList.options[audioDeviceList.selectedIndex];
                        DeviceSwitching.conference.me.deviceStream.microphone.deviceId = option.value;
                    });
                    fm.liveswitch.Util.observe(videoDeviceList, 'change', function (evt) {
                        let option = videoDeviceList.options[videoDeviceList.selectedIndex];
                        DeviceSwitching.conference.me.deviceStream.camera.deviceId = option.value;
                    });
                    DeviceSwitching.conference.onStateChange = null;
                }
            };
        });
    }
    conferenceLeave() {
        DeviceSwitching.conference.leave();
        DeviceSwitching.conference = null;
    }
}
DeviceSwitching.video = null;
DeviceSwitching.leaveConferenceButton = null;
DeviceSwitching.clientJoinButton = null;
DeviceSwitching.conference = null;
export { DeviceSwitching };
let demo = new DeviceSwitching();
