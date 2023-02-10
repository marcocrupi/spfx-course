export interface IRenderAllPagesProps {
  description: string;
  allPages: ISPLists;
  filter: string;
}

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}
