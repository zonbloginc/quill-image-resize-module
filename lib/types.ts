import type { DisplaySize } from "./modules/DisplaySize";
import type { Resize } from "./modules/Resize";

export type Modules = (
  | "DisplaySize"
  | "Resize"
  | typeof DisplaySize
  | typeof Resize
)[];

export type Options = {
  modules: Modules;
  minWidth: number;
  keyboardSizeDelta: number;
  overlayStyles: {
    position: string;
    boxSizing: string;
    border: string;
  };
  handleStyles: {
    position: string;
    height: string;
    width: string;
    backgroundColor: string;
    border: string;
    boxSizing: string;
    opacity: string;
  };
  displayStyles: {
    position: string;
    font: string;
    padding: string;
    textAlign: string;
    backgroundColor: string;
    color: string;
    border: string;
    boxSizing: string;
    opacity: string;
    cursor: string;
  };
};

export type ImageResizeOptions = {
  modules?: Modules;
  minWidth?: number;
  keyboardSizeDelta?: number;
  overlayStyles?: {
    position?: string;
    boxSizing?: string;
    border?: string;
  };
  handleStyles?: {
    position?: string;
    height?: string;
    width?: string;
    backgroundColor?: string;
    border?: string;
    boxSizing?: string;
    opacity?: string;
  };
  displayStyles?: {
    position?: string;
    font?: string;
    padding?: string;
    textAlign?: string;
    backgroundColor?: string;
    colo?: string;
    border?: string;
    boxSizing?: string;
    opacity?: string;
    cursor?: string;
  };
};
