import { ISink } from "./ISink";
import { SubStreamType } from "./SubStreamType";
import { IView } from "./ILayout";
import { IAction2 } from "./IAction2";
export interface ISubStream {
    id: string;
    tag: string;
    substreamType: SubStreamType;
    enable(): void;
    disable(): void;
    play(sink?: ISink): void;
    view?: IView;
    onStateChange?: IAction2<ISubStream, SubStreamState>;
    state?: SubStreamState;
    isNew?: boolean;
    isEnabled?: boolean;
    isDisabled?: boolean;
    enabled(): Promise<ISubStream>;
    disabled(): Promise<ISubStream>;
}
export declare enum SubStreamState {
    New = 1,
    Enabled = 2,
    Disabled = 3
}
