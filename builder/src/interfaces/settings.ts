import IWorkspace from "./workspace";

export default interface ISettings {
  selectedItem?: IWorkspace;
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
  setOpenSetting?: (open: boolean) => void;
  settingItemId?: string;
  openTab?: number;
  setOpenTab?: (openTab: number) => void;
  handlePlaceholderChange?: (e) => void;
  handleTextChange?: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleLinkChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
