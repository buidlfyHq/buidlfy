import IItems from "./items";

export default interface ISettings {
  selectedItem?: IItems;
  settingItemId?: string;
  elementConfig?: object;
  openTab?: number;
  setOpenTab?: (openTab: number) => void;
  handleChange?: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    propertyName: string
  ) => void;
}
