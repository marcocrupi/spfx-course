declare interface IFirstListviewCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'FirstListviewCommandSetStrings' {
  const strings: IFirstListviewCommandSetStrings;
  export = strings;
}
