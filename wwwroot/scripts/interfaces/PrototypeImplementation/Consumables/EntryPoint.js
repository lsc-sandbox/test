export class EntryPoint {
    constructor() {
        fm.liveswitch.Log.registerProvider(new fm.liveswitch.ConsoleLogProvider(fm.liveswitch.LogLevel.Debug));
    }
    static Instance() {
        if (typeof EntryPoint._Instance == "undefined") {
            EntryPoint._Instance = new EntryPoint();
        }
        return EntryPoint._Instance;
    }
}
export function LogDebug(logMessage) {
    fm.liveswitch.Log.debug(logMessage);
}
