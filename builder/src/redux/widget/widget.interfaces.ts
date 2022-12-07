import { BigNumber } from "ethers";
import { IContractDetails } from "redux/contract/contract.interfaces";
import { IHead, IWorkspaceElement } from "redux/workspace/workspace.interfaces";

export interface IWidgetState {
  publicationId: IPublicationId; 
  profileId: string;
  ownedBy: string;
  profilePicture: string;
  coverPicture: string;
  handle: string;
  name: string;
  createdAt: string;
  postDescription: string;
  postMedia: string;
  inputValue: boolean;
}

export interface IPublicationId {
  id: number;
  name: string;
}