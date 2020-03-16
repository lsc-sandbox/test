export interface ILayout {
    mode: LayoutMode;
    setMargins: {
        (horizontal: number, vertical: number): void;
    };
    setBackgroundColor: {
        (hex: string): void;
        (red: number, green: number, blue: number): void;
        (color: Color): void;
    };
    getViews: {
        (): IView[];
        (userId: string): IView[];
    };
    getView(streamId: string): IView;
    getRemoteViews(): IView[];
    getRemoteView(): IView;
    getRemoteCameraView(): IView;
    getRemoteCameraViews(): IView[];
    getRemoteScreenView(): IView;
    getRemoteScreenViews(): IView[];
    getLocalView(): IView;
    getLocalViews(): IView[];
    getLocalCameraView(): IView;
    getLocalCameraViews(): IView[];
    getLocalScreenView(): IView;
    getLocalScreenViews(): IView[];
    setPromimentView(view: IView): void;
}
export interface IView {
    userId: string;
    streamId: string;
    frame: Rectangle;
    bounds: Rectangle;
}
export declare class Rectangle {
    origin: Point;
    size: Size;
}
export declare class Size {
    height: number;
    width: number;
}
export declare class Point {
    x: number;
    y: number;
}
export interface LayoutConstructor {
    new (container: Element): ILayout;
}
export declare enum LayoutMode {
    HorizontalFill = 0,
    VerticalFill = 1,
    ProminentBottomFill = 2,
    ProminentRightFill = 3,
    Custom = 4
}
export declare enum Color {
    Black = 0,
    Red = 1,
    Green = 2,
    Blue = 3,
    White = 4
}
