import LightThemeIcon from 'assets/icons/theme1.png';
import DarkThemeIcon from 'assets/icons/theme2.png';

export interface INftCardThemes {
  name: string;
  icon: any;
  colors: {
    primary: string;
    secondary: string;
  };
}

export interface IApiSource {
  id: number;
  name: string;
  label: string;
  placeholder: string;
  unavailable: boolean;
}

export const nftCardThemes: INftCardThemes[] = [
  { name: 'Light Theme', icon: LightThemeIcon, colors: { primary: 'rgba(255, 255, 255, 1)', secondary: 'rgba(0, 0, 0, 1)' } },
  { name: 'Dark Theme', icon: DarkThemeIcon, colors: { primary: 'rgba(0, 0, 0, 1)', secondary: 'rgba(255, 255, 255, 1)' } },
];

export const apiSources: IApiSource[] = [
  // { id: 1, name: 'Opensea', label: 'Collection Name : ', placeholder: 'astarprince', unavailable: true },
  { id: 2, name: 'Rarible', label: 'Collection Address :', placeholder: '0x3....da91', unavailable: false },
];

export const cardsPerRowValues: number[] = Array.from(Array(4).keys(), n => n + 1);
