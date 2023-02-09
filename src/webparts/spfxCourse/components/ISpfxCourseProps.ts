import { WebPartContext } from "@microsoft/sp-webpart-base";

import { IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";

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

  // label: string;
  // loadOptions: () => Promise<IDropdownOption[]>;
  // onChanged: (option: IDropdownOption, index?: number) => void;
  // selectedKey: string | number;
  // disabled: boolean;
  // stateKey: string;
}

export interface ILink {
  text: string;
  href: string;
  target: string;
}
