import { IDevice } from "./IDevice";
export interface ISink {
    id?: string;
    sinkDevice?: IDevice;
    mute: () => void;
    unmute: () => void;
    isMuted?: boolean;
}
