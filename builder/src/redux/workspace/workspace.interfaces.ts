export interface IWorkspaceState {
  workspaceElements: IWorkspaceElements[];
  selectedElement: IWorkspaceElements;
}

export interface IWorkspaceElements {
  i: string;
  x: number;
  y: number;
  h: number;
  minH?: number;
  maxH?: number;
  w: number;
  minW?: number;
  maxW?: number;
  link?: string;
  name: string;
  value?: string;
  style: IStyles;
  children?: any; // Fix: Work in progress as it is not compatible new children type
  isBounded?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  moved?: boolean;
  static?: boolean;
  resizeHandles?: ResizeHandles | undefined;
  contract?: any;
  imgData?: string | ArrayBuffer;
  connectWallet?: string;
  placeholder?: string;
}

export interface IStyles {
  color?: IColor;
  backgroundColor?: IColor;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  justifyContent?: string;
  fontSize?: number;
  deleteComponent?: number;
  borderRadius?: number;
  borderWidth?: number;
  shadow?: string;
  margin?: {
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
  };
  padding?: {
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
}

export interface IColor {
  r: string | number;
  g: string | number;
  b: string | number;
  a?: string | number;
}

export type ResizeHandles = Array<
  "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne"
>;

export interface IAction {
  payload: IElementDetails;
}

export interface IElementDetails {
  settingItemId: string;
  propertyName: string;
  propertyValue: string | number | IColor;
  childPropertyName?: string;
}

export enum sidebarEnum {
  PAGES = "pages",
  TEMPLATES = "templates",
  ELEMENTS = "elements",
  MEDIA = "media",
  STYLES = "styles",
  HELP = "help",
  SETTING = "setting",
}
