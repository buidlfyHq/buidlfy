export interface ILensterState {
  publications: IPublication[];
  inputValue?: boolean;
}

export interface IPublication {
  id: string;
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
