import { Client } from "./interfaces/PrototypeImplementation/Consumables/Client.js";
import { IConference } from "./interfaces/Interfaces/IConference.js";
import { MessageArgs } from "./interfaces/PrototypeImplementation/Consumables/MessageArgs.js";
import { ISession, SessionState } from "./interfaces/Interfaces/ISession.js";
import { IMessageArgs } from "./interfaces/Interfaces/ImessageArgs.js";
import { IReceiveArgs } from "./interfaces/Interfaces/IReceiveArgs.js";
import { DeviceManager } from "./interfaces/PrototypeImplementation/Consumables/DeviceManager.js";

class App {

    joinConfererence() {
        App.client = new Client(App.userId.value);
        App.client.connect().then(() => {
            App.conference = App.client.join({ conferenceId: "123123", videoSinkElementId: App.video.id });
            App.conference.onIncomingMessage = (_session: ISession, message: IMessageArgs & IReceiveArgs) => {
                App.writeMessage(message.senderId + ": " + message.stringMessage);
            };
            App.isCameraOn = true;
            App.leaveConferenceButton.disabled = false;
            App.switchToScreenShare.disabled = false;
            App.toggleAudioButton.value = "Mute Audio";
            App.toggleVideoButton.value = "Mute Video";
            App.toggleAudioButton.disabled = false;
            App.toggleVideoButton.disabled = false;


            let audioDeviceList = document.getElementById('audioDeviceList') as HTMLSelectElement;
            if (audioDeviceList) {
                audioDeviceList.options.length = 0;
            }
            let videoDeviceList = document.getElementById('videoDeviceList') as HTMLSelectElement;
            if (videoDeviceList) {
                videoDeviceList.options.length = 0;
            }
            App.conference.onStateChange = (_session: ISession, state: SessionState) => {
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
                    fm.liveswitch.Util.observe(audioDeviceList, 'change', function (evt: any) {
                        let option = audioDeviceList.options[audioDeviceList.selectedIndex];
                        App.conference.me.deviceStream.microphone.deviceId = option.value;
                    });
                    fm.liveswitch.Util.observe(videoDeviceList, 'change', function (evt: any) {
                        let option = videoDeviceList.options[videoDeviceList.selectedIndex];
                        App.conference.me.deviceStream.camera.deviceId = option.value;
                    });

                    App.conference.onStateChange = null;
                }
            }
        });
    }

    private static isScreenOn = false;
    private static isCameraOn = false;

    switchMode() {
        if (App.isCameraOn && App.isScreenOn) {
            App.conference.me.screenStream.stop();
            App.isScreenOn = false;
        }
        else if (App.isCameraOn) {
            App.conference.me.deviceStream.camera.disable();
            //App.conference.startScreenStream();
            App.isCameraOn = false;
            App.isScreenOn = true;
        } else if (App.isScreenOn) {
            App.conference.me.deviceStream.camera.enable();
            //App.conference.me.screenStream.stop();
            //App.conference.startDeviceStream();
            App.isCameraOn = true;
            App.isScreenOn = false;
        }
    }
    conferenceLeave() {
        App.conference.leave();
        App.conference = null;
    }
    sendMessage = () => {
        let text = App.inputText.value;
        if (App.conference != null) {
            App.conference.sendMessage(new MessageArgs(text));
        }
        App.inputText.value = "";
        App.writeMessage("Me: " + text);
    };
    static writeMessage = (msg: string) => {
        var content = document.createElement('p');
        content.innerHTML = msg;
        if (App.text != null) {
            App.text.appendChild(content);
            App.text.scrollTop = App.text.scrollHeight;
        }
    };
    private CameraMuted = false;
    private AudioMuted = false;
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
                    participant.deviceStream.camera.disable();
                });
                this.CameraMuted = true;
                App.toggleVideoButton.value = "Unmute Video";
            }
            else {
                App.conference.participants.forEach((participant) => {
                    participant.deviceStream.camera.enable();
                });
                this.CameraMuted = false;
                App.toggleVideoButton.value = "Mute Video";
            }
        }
    }
    static video?: HTMLElement = null;
    static text?: HTMLButtonElement = null;
    static inputText?: HTMLButtonElement = null;
    static switchToScreenShare?: HTMLButtonElement = null;
    static leaveConferenceButton?: HTMLButtonElement = null;
    static userId?: HTMLInputElement = null;

    static sendButton?: HTMLButtonElement = null;
    static inviteButton?: HTMLButtonElement = null;
    static clientConnectButton: HTMLButtonElement = null;
    static clientJoinButton: HTMLButtonElement = null;

    static toggleAudioButton: HTMLButtonElement = null;
    static toggleVideoButton: HTMLButtonElement = null;

    static client: Client = null;
    static conference?: IConference = null;
    constructor() {
        App.video = document.getElementById('video') as HTMLElement;
        App.video.style.display = 'block';
        App.text = document.getElementById('eventLog') as HTMLButtonElement;
        App.inputText = document.getElementById('sendInput') as HTMLButtonElement;

        App.sendButton = document.getElementById('sendButton') as HTMLButtonElement;
        App.sendButton.addEventListener("click", this.sendMessage);

        App.clientJoinButton = document.getElementById('clientJoin') as HTMLInputElement;
        App.clientJoinButton.addEventListener("click", this.joinConfererence); // modify       

        App.userId = document.getElementById('userName') as HTMLInputElement;

        App.switchToScreenShare = document.getElementById('switchScreenShare') as HTMLButtonElement;
        App.switchToScreenShare.addEventListener("click", this.switchMode); // modify        
        App.switchToScreenShare.disabled = true; 

        App.leaveConferenceButton = document.getElementById('leaveConference') as HTMLButtonElement;
        App.leaveConferenceButton.addEventListener("click", this.conferenceLeave); // modify    
        App.leaveConferenceButton.disabled = true; 

        App.toggleAudioButton = document.getElementById('toggleAudioMute') as HTMLButtonElement;
        App.toggleAudioButton.addEventListener("click", this.toggleAudio); // modify    
        App.toggleAudioButton.disabled = true; 

        App.toggleVideoButton = document.getElementById('toggleVideoMute') as HTMLButtonElement;
        App.toggleVideoButton.addEventListener("click", this.toggleVideo); // modify    
        App.toggleVideoButton.disabled = true; 
    }
}
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