import { BigNumber } from "ethers";
import { IContractDetails } from "redux/contract/contract.interfaces";
import { IHead, IWorkspaceElement } from "redux/workspace/workspace.interfaces";

export interface IWidgetState {
  publications: Array<IPublications>;
  inputValue?: boolean;
}

export interface IPublications {
  id: number;
  name: string;
  profileId?: string;
  ownedBy?: string;
  profilePicture?: string;
  coverPicture?: string;
  handle?: string;
  profileName?: string;
  createdAt?: string;
  postDescription?: string;
  postMedia?: string;
}
