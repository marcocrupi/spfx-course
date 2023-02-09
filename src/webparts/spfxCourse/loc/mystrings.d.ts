declare interface ISpfxCourseWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel: string;
  ListFieldLabel: string;
}

declare module "SpfxCourseWebPartStrings" {
  const strings: ISpfxCourseWebPartStrings;
  export = strings;
}
