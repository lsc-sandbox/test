export class CentralConnections {
    // Singleton
    public static Instance(): CentralConnections {
        if (typeof CentralConnections._Instance == "undefined") {
            CentralConnections._Instance = new CentralConnections();
        }
        return CentralConnections._Instance;
    }
    private static _Instance: CentralConnections;
    private constructor() { }

    /// don't know if I will need this 
    //private sfuUpstreamConnections = new Map<string, fm.liveswitch.SfuUpstreamConnection>();

    //clientId, connectionInfo
    //need to update the remoteClientInfo on update.

    public remoteConnectionInfoForCamera = new Map<string, fm.liveswitch.ConnectionInfo>();
    public remoteConnectionInfoForScreen = new Map<string, fm.liveswitch.ConnectionInfo>();
    //private sfuDownstreamConnections = new Map<fm.liveswitch.ConnectionInfo, fm.liveswitch.SfuDownstreamConnection>();
    //public remoteStreamsForCamera = new Map<string, fm.liveswitch.RemoteMedia>();
    //public remoteStreamsForScreen = new Map<string, fm.liveswitch.RemoteMedia>();
    //private updateDownStreamConnection(remoteClientId: string, haveVideo: boolean, haveAudio: boolean) {


        // remoteclient should exist if them method is closed.
        // if connection does not exist, then create connection 
        // o / w update connection with reinogoication

        // cannot have connection with out any stream... save the remote connection info
    //}
    /// Actually there is no device on sink...its just a stream... and youare 
//    private muteOrUnmuteDeviceSink(remoteClientId: string, videoDevice: boolean, FromScreenStream: boolean, mute: boolean) {
//    // should only mute or unmute if there is stream there.
//    let remoteMedia: fm.liveswitch.RemoteMedia = null;
//    if (FromScreenStream) {
//        remoteMedia = this.remoteStreamsForScreen.get(remoteClientId);
//    } else {
//        remoteMedia = this.remoteStreamsForCamera.get(remoteClientId);
//    }
//    if (remoteMedia) {
//        if (videoDevice && remoteMedia.getVideoTrack()) {
//            let videoTrack = remoteMedia.getVideoTrack();
//            if (mute) {
//                videoTrack.setMuted(true);
//            }
//            else {
//                videoTrack.setMuted(false);
//            }
//        }
//        else if (!videoDevice && remoteMedia.getAudioTrack()) {
//            let audioTrack = remoteMedia.getAudioTrack();
//            if (mute) {
//                audioTrack.setMuted(true);
//            }
//            if (mute) {
//                audioTrack.setMuted(false);
//            }
//        }
//    }
//}

}
/*        let updateConnection = (enableVideo: boolean, enableAudio: boolean) => {
            let connectionConfig = connection.getConfig();
            if (enableAudio) {
                connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.ReceiveOnly));
            }
            else {
                connectionConfig.setAudioDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            let layoutHasRemoteView = false;
            for (let id in SharedObjects.Instance().getLayoutManager(this).getRemoteViewIds()) {
                if (id == remoteMedia.getId()) {
                    layoutHasRemoteView = true;
                }
            }
            if (enableVideo) {
                if (CentralConnections.Instance().remoteConnectionInfoForCamera.get(remoteConnectionInfo.getClientId()).getHasVideo()) {
                    connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.ReceiveOnly));
                    if (!layoutHasRemoteView) {
                        SharedObjects.Instance().getLayoutManager(this).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
                    }
                }
            }
            else {
                if (layoutHasRemoteView) {
                    SharedObjects.Instance().getLayoutManager(this).removeRemoteView(remoteMedia.getId());
                }
                connectionConfig.setVideoDirection(me._Direction(fm.liveswitch.StreamDirection.Inactive));
            }
            connection.update(connectionConfig);

            ////let connectioninfo = connection.getInfo();
            ////let videoAlreadyon = connectioninfo.getHasVideo();
            ////connectioninfo.getVideoStream().getDirection();
            ////let audioAlreadyon = connectioninfo.getHasAudio();
            //let updateRequired = false;
            //let createVideo = false;
            //let destroyVideo = false;
            //let createAudio = false;
            //let destroyAudio = false;

            //if (enableVideo && !videoAlreadyon) {
            //    createVideo = true;
            //}
            //if (!enableVideo && videoAlreadyon) {
            //    destroyVideo = true;
            //}
            //if (enableAudio && !audioAlreadyon) {
            //    createAudio = true;
            //}
            //if (!enableAudio && audioAlreadyon) {
            //    destroyAudio = true;
            //}
            //if (createVideo || destroyVideo || createAudio || destroyAudio) {
            //    updateRequired = true;
            //}
            //remoteMedia;
            //let newAudioStream: fm.liveswitch.AudioStream = null
            //let newVideoStream: fm.liveswitch.VideoStream = null;
            //if (destroyVideo || destroyVideo) {
            //    remoteMedia.destroy();
            //    remoteMedia = null;
            //    remoteMedia = new fm.liveswitch.RemoteMedia();
            //}
            //if (createVideo) {
            //    newVideoStream = new fm.liveswitch.VideoStream(remoteMedia);
            //}
            //if (createAudio) {
            //    newAudioStream = new fm.liveswitch.AudioStream(remoteMedia);
            //}

            //connectioninfo.setAudioStream(newAudioStream.getInfo());
            //connectioninfo.setVideoStream(newVideoStream.getInfo());
            //connection.updateConnection(connection.getInfo(), connectioninfo);
            //SharedObjects.Instance().getLayoutManager(this).addRemoteView(remoteMedia.getId(), remoteMedia.getView());
        //SharedObjects.Instance().getLayoutManager(this).removeRemoteView(remoteMedia.getId());
        };*/