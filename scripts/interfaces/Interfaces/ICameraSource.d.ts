import { ISource } from "./ISource";
export interface ICameraSource extends ISource {
    preview(element: string): void;
}
