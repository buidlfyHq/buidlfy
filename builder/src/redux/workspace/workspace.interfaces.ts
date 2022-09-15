export interface IWorkspaceState {
  workspaceElements: IWorkspaceElement[];
  selectedElement: IWorkspaceElement;
}

export interface IWorkspaceElement {
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
  style: IStyle;
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

export interface IStyle {
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
  payload: IElementDetail;
}

export interface IElementDetail {
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

export interface IBgContainer {
  backgroundColor: IColor;
  color: IColor;
  imgData: string | ArrayBuffer;
  borderRadius: number;
  borderWidth: number;
  shadow: string;
}

export interface ISettings {
  selectedItem?: IWorkspaceElement;
  setShowComponent?: (showComponent: {
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  }) => void;
  showComponent?: {
    id: string;
    value: {
      name: string;
      inputs: object[];
      outputs: object[];
      stateMutability: string;
    };
  };
  settingItemId?: string;
  openTab?: number;
  setOpenTab?: (openTab: number) => void;
  handleChange?: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    propertyName: string
  ) => void;
}

export interface ITemplate {
  name: string;
  value: IWorkspaceElement[];
}

export interface ITexts {
  item?: IWorkspaceElement;
  items?: IWorkspaceElement[];
  setItems?: (items?: IWorkspaceElement[]) => void;
  bold: string;
  italic: string;
  underline: string;
  color?: IColor;
  justifyContent: string;
  fontSize: number;
  value: string;
  link: string;
  borderRadius?: number;
  backgroundColor?: IColor;
  shadow?: string;
  connectWallet?: string;
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
