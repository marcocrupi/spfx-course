import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpfxCourseProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
  list: any;
  singlelist: any;
  slider: number;
  link: ILink;
  listName: string;
  storeList: string;
  itemName: string;
}

export interface ILink {
  text: string;
  href: string;
  target: string;
}
