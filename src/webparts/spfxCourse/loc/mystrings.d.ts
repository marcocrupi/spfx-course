declare interface ISpfxCourseWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel: string;
  ListFieldWriteLabel: string;
  ListFieldSelectLabel: string;
  ItemFieldLabel: string;
}

declare module "SpfxCourseWebPartStrings" {
  const strings: ISpfxCourseWebPartStrings;
  export = strings;
}
