export interface IPublication {
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
