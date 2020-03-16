import { LogDebug, EntryPoint } from "./EntryPoint.js";

export class DefaultConfig {
    public DefaultAppId: string = "my-app-id";
    public DefaultGatewayUrl: string = "https://demo.liveswitch.fm:8443/sync";
    public DefaultSharedSecret: string = "--replaceThisWithYourOwnSharedSecret--";
    public DefaultChannel: string = "YouWillNeverFindMe";
    public DefaultChannels!: string[];
    public DefaultDevice: string = "Device";
    public DefaultUserId: string = "User";
    public ClientId: string = "ClientId";
    private static _Instance: DefaultConfig;
    private constructor() {
        // Make Sure Entrypoint Exists.. this stupid.. fix it later
        EntryPoint.Instance();
        this.DefaultChannels = new Array<string>();
        for (let i = 0; i < 10 ; i++)
        {
            this.DefaultChannels[i] = "conference/" + Math.floor(Math.random() * 9999999).toString();
            LogDebug("Pre-generated conference Id: " + this.DefaultChannels[i]);
        }
        fm.liveswitch.Log.debug("DefaultConfig class is created ");
    }
    public static Instance(): DefaultConfig {
        if (typeof DefaultConfig._Instance == "undefined") {
            DefaultConfig._Instance = new DefaultConfig();
        }
        return DefaultConfig._Instance;
    }
}
