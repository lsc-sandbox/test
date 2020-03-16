export declare class DefaultConfig {
    DefaultAppId: string;
    DefaultGatewayUrl: string;
    DefaultSharedSecret: string;
    DefaultChannel: string;
    DefaultChannels: string[];
    DefaultDevice: string;
    DefaultUserId: string;
    ClientId: string;
    private static _Instance;
    private constructor();
    static Instance(): DefaultConfig;
}
