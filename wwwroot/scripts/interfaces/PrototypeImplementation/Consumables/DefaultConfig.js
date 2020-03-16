import { LogDebug, EntryPoint } from "./EntryPoint.js";
export class DefaultConfig {
    constructor() {
        this.DefaultAppId = "my-app-id";
        this.DefaultGatewayUrl = "https://demo.liveswitch.fm:8443/sync";
        this.DefaultSharedSecret = "--replaceThisWithYourOwnSharedSecret--";
        this.DefaultChannel = "YouWillNeverFindMe";
        this.DefaultDevice = "Device";
        this.DefaultUserId = "User";
        this.ClientId = "ClientId";
        // Make Sure Entrypoint Exists.. this stupid.. fix it later
        EntryPoint.Instance();
        this.DefaultChannels = new Array();
        for (let i = 0; i < 10; i++) {
            this.DefaultChannels[i] = "conference/" + Math.floor(Math.random() * 9999999).toString();
            LogDebug("Pre-generated conference Id: " + this.DefaultChannels[i]);
        }
        fm.liveswitch.Log.debug("DefaultConfig class is created ");
    }
    static Instance() {
        if (typeof DefaultConfig._Instance == "undefined") {
            DefaultConfig._Instance = new DefaultConfig();
        }
        return DefaultConfig._Instance;
    }
}
