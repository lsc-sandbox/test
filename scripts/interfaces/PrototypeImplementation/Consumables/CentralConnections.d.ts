export declare class CentralConnections {
    static Instance(): CentralConnections;
    private static _Instance;
    private constructor();
    remoteConnectionInfoForCamera: Map<string, fm.liveswitch.ConnectionInfo>;
    remoteConnectionInfoForScreen: Map<string, fm.liveswitch.ConnectionInfo>;
}
