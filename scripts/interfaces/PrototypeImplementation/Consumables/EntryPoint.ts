export class EntryPoint {
    private static _Instance: EntryPoint;
    constructor() {
        fm.liveswitch.Log.registerProvider(new fm.liveswitch.ConsoleLogProvider(fm.liveswitch.LogLevel.Debug));
    }
    public static Instance(): EntryPoint {
        if (typeof EntryPoint._Instance == "undefined") {
            EntryPoint._Instance = new EntryPoint();
        }
        return EntryPoint._Instance;
    }
}
export function LogDebug(logMessage: string): void {
    fm.liveswitch.Log.debug(logMessage);
}