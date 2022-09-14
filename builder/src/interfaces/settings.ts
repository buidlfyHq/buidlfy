import IItems from "./items";

export default interface ISettings {
  selectedItem?: IItems;
  setOpenSetting?: (open: boolean) => void;
  settingItemId?: string;
  elementConfig?: object;
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
