export interface IUploadedImageData {
  uploadedImageData: string;
  settingItemId: string;
}

export interface IWorkspaceState {
  workspaceElements: IWorkspaceElement[];
  selectedElement: IWorkspaceElement;
  uploadedImagesData: IUploadedImageData[];
  workspaceBackgroundColor: string;
  head: IHead;
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
  connectWallet?: boolean;
  placeholder?: string;
  wallet?: string;
  slug?: string;
  limit?: number;
  cardsPerRow?: number;
}

export interface IHead {
  title: string;
  logo: string | ArrayBuffer;
}

export interface IUploadedImageData {
  settingItemId: string;
  uploadedImageData: string;
}

export interface IStyle {
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  justifyContent?: string;
  fontSize?: number;
  deleteComponent?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  shadow?: string;
  isAuto?: boolean;
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
  width?: number;
  height?: number;
  backgroundSize?: string;
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
  propertyValue: string | number | boolean;
  childPropertyName?: string;
  imageSizeProperty?: boolean;
}

export enum SidebarEnum {
  PAGES = "pages",
  TEMPLATES = "templates",
  ELEMENTS = "elements",
  MEDIA = "media",
  STYLES = "styles",
  HELP = "help",
  SETTING = "setting",
}

export interface IBackgroundContainer {
  backgroundColor: string;
  color: string;
  imgData: string | ArrayBuffer;
  borderRadius: number;
  borderWidth: number;
  shadow: string;
}

export interface ISettings {
  selectedElement?: IWorkspaceElement;
  setShowComponent?: (showComponent: IShowComponent) => void;
  showComponent?: IShowComponent;
  settingItemId?: string;
  openTab?: number;
  setOpenTab?: (openTab: number) => void;
  handleSettingChange?: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    propertyName: string
  ) => void;
  setOpenSetting?: (openSetting?: boolean) => void;
}

export interface IShowComponent {
  id: string;
  value: {
    name: string;
    inputs: object[];
    outputs: object[];
    stateMutability: string;
  };
}

export interface ITemplate {
  name: string;
  value: IWorkspaceElement[];
}

export interface IText {
  i?: string;
  setItems?: (items?: IWorkspaceElement[]) => void;
  bold: string;
  italic: string;
  underline: string;
  color?: string;
  borderColor?: string;
  justifyContent: string;
  fontSize: number;
  value: string;
  link: string;
  borderRadius?: number;
  borderWidth?: number;
  backgroundColor?: string;
  shadow?: string;
  connectWallet?: boolean;
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
