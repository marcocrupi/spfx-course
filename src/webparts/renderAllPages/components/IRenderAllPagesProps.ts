export interface IRenderAllPagesProps {
  description: string;
  allPages: ISPLists;
}

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}
