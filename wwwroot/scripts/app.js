import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { MessageArgs } from "./interfaces/PrototypeImplementation/Consumables/MessageArgs.js";
import { SessionState } from "./interfaces/Interfaces/ISession.js";
import { DeviceManager } from "./interfaces/PrototypeImplementation/Consumables/DeviceManager.js";
class App {
    constructor() {
        this.sendMessage = () => {
            let text = App.inputText.value;
            if (App.conference != null) {
                App.conference.sendMessage(new MessageArgs(text));
            }
            App.inputText.value = "";
            App.writeMessage("Me: " + text);
        };
        this.CameraMuted = false;
        this.AudioMuted = false;
        App.video = document.getElementById('video');
        App.video.style.display = 'block';
        App.text = document.getElementById('eventLog');
        App.inputText = document.getElementById('sendInput');
        App.sendButton = document.getElementById('sendButton');
        App.sendButton.addEventListener("click", this.sendMessage);
        App.clientJoinButton = document.getElementById('clientJoin');
        App.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       
        App.userId = document.getElementById('userName');
        App.switchToScreenShare = document.getElementById('switchScreenShare');
        App.switchToScreenShare.addEventListener("click", this.switchMode); // modify        
        App.switchToScreenShare.disabled = true;
        App.leaveConferenceButton = document.getElementById('leaveConference');
        App.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
        App.leaveConferenceButton.disabled = true;
        App.toggleAudioButton = document.getElementById('toggleAudioMute');
        App.toggleAudioButton.addEventListener("click", this.toggleAudio); // modify    
        App.toggleAudioButton.disabled = true;
        App.toggleVideoButton = document.getElementById('toggleVideoMute');
        App.toggleVideoButton.addEventListener("click", this.toggleVideo); // modify    
        App.toggleVideoButton.disabled = true;
    }
    joinConfererence() {
        App.client = new Client(App.userId.value);
        App.client.connect().then(() => {
            App.conference = App.client.join({ conferenceId: "123123", videoSinkElementId: App.video.id });
            App.conference.onIncomingMessage = (_session, message) => {
                App.writeMessage(message.senderId + ": " + message.stringMessage);
            };
            App.isCameraOn = true;
            App.leaveConferenceButton.disabled = false;
            App.switchToScreenShare.disabled = false;
            App.toggleAudioButton.value = "Mute Audio";
            App.toggleVideoButton.value = "Mute Video";
            App.toggleAudioButton.disabled = false;
            App.toggleVideoButton.disabled = false;
            let audioDeviceList = document.getElementById('audioDeviceList');
            if (audioDeviceList) {
                audioDeviceList.options.length = 0;
            }
            let videoDeviceList = document.getElementById('videoDeviceList');
            if (videoDeviceList) {
                videoDeviceList.options.length = 0;
            }
            App.conference.onStateChange = (_session, state) => {
                if (state == SessionState.Connected) {
                    let deviceManager = new DeviceManager();
                    deviceManager.getAudioInputDevices().then((devices) => {
                        let currentVideoId = App.conference.me.deviceStream.microphone.deviceId;
                        devices.forEach((device) => {
                            var option = document.createElement('option');
                            option.value = device.deviceId;
                            option.text = device.label;
                            option.selected = (currentVideoId == device.deviceId);
                            audioDeviceList.add(option);
                        });
                    });
                    deviceManager.getVideoInputDevices().then((devices) => {
                        let currentVideoId = App.conference.me.deviceStream.camera.deviceId;
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
                        App.conference.me.deviceStream.microphone.deviceId = option.value;
                    });
                    fm.liveswitch.Util.observe(videoDeviceList, 'change', function (evt) {
                        let option = videoDeviceList.options[videoDeviceList.selectedIndex];
                        App.conference.me.deviceStream.camera.deviceId = option.value;
                    });
                    App.conference.onStateChange = null;
                }
            };
        });
    }
    switchMode() {
        if (App.isCameraOn && App.isScreenOn) {
            App.conference.me.screenStream.stop();
            App.isScreenOn = false;
        }
        else if (App.isCameraOn) {
            App.conference.me.deviceStream.camera.disable();
            App.conference.startScreenStream();
            App.isCameraOn = false;
            App.isScreenOn = true;
        }
        else if (App.isScreenOn) {
            //App.conference.me.deviceStream.camera.enable();
            App.conference.me.screenStream.stop();
            App.conference.startDeviceStream();
            App.isCameraOn = true;
            App.isScreenOn = false;
        }
    }
    conferenceLeave() {
        App.conference.leave();
        App.conference = null;
    }
    toggleAudio() {
        if (!this.AudioMuted) {
            App.conference.participants.forEach((participant) => {
                participant.deviceStream.microphone.disable();
            });
            App.toggleAudioButton.value = "Unmute Audio";
            this.AudioMuted = true;
        }
        else {
            App.conference.participants.forEach((participant) => {
                participant.deviceStream.microphone.enable();
            });
            App.toggleAudioButton.value = "Mute Audio";
            this.AudioMuted = false;
        }
    }
    toggleVideo() {
        if (App.isCameraOn) {
            if (!this.CameraMuted) {
                App.conference.participants.forEach((participant) => {
                    if (!participant.isMe) {
                        participant.deviceStream.camera.disable();
                    }
                });
                this.CameraMuted = true;
                App.toggleVideoButton.value = "Unmute Video";
            }
            else {
                App.conference.participants.forEach((participant) => {
                    if (!participant.isMe) {
                        participant.deviceStream.camera.enable();
                    }
                });
                this.CameraMuted = false;
                App.toggleVideoButton.value = "Mute Video";
            }
        }
    }
}
App.isScreenOn = false;
App.isCameraOn = false;
App.writeMessage = (msg) => {
    var content = document.createElement('p');
    content.innerHTML = msg;
    if (App.text != null) {
        App.text.appendChild(content);
        App.text.scrollTop = App.text.scrollHeight;
    }
};
App.video = null;
App.text = null;
App.inputText = null;
App.switchToScreenShare = null;
App.leaveConferenceButton = null;
App.userId = null;
App.sendButton = null;
App.inviteButton = null;
App.clientConnectButton = null;
App.clientJoinButton = null;
App.toggleAudioButton = null;
App.toggleVideoButton = null;
App.client = null;
App.conference = null;
export { App };
let demo = new App();
//App.inviteUserId = document.getElementById('invitePerson') as HTMLInputElement;
//App.inviteButton = document.getElementById('invite') as HTMLButtonElement;
//App.inviteButton.addEventListener("click", this.invite); // modify  
//static inviteUserId?: HTMLInputElement = null;
//invite() {
//    var inviteSend = App.conference.invite(App.inviteUserId.value);
//    inviteSend.oninviteaccepted =() => {
//        //  cool I guess.
//    };
//    inviteSend.oninviterejected = (args) => {
//        // why did you do this.
//       let reason =  args.toString();
//    };
//}
