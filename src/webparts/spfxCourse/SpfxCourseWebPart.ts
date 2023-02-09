import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown,
} from "@microsoft/sp-property-pane";
import {
  BaseClientSideWebPart,
  WebPartContext,
} from "@microsoft/sp-webpart-base";

import * as strings from "SpfxCourseWebPartStrings";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import SpfxCourse from "./components/SpfxCourse";
import { ISpfxCourseProps } from "./components/ISpfxCourseProps";

import { escape } from "@microsoft/sp-lodash-subset";

import { PropertyPaneAsyncDropdown } from "./components/AsyncDropDown/PropertyPaneAsyncDropdown";
import { IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";
import { update, get } from "@microsoft/sp-lodash-subset";

export interface ISpfxCourseWebPartProps {
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
  item: string;
}

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export interface ILink {
  text: string;
  href: string;
  target: string;
}

export default class SpfxCourseWebPart extends BaseClientSideWebPart<ISpfxCourseWebPartProps> {
  private itemsDropDown: PropertyPaneAsyncDropdown;

  // VISUALIZZARE LE LISTE SPECIFICATE DENTO resolve() NEL DROPDOWN
  // private loadLists(): Promise<IDropdownOption[]> {
  //   return new Promise<IDropdownOption[]>(
  //     (
  //       resolve: (options: IDropdownOption[]) => void,
  //       reject: (error: any) => void
  //     ) => {
  //       setTimeout(() => {
  //         resolve([
  //           {
  //             key: "sharedDocuments",
  //             text: "Shared Documents",
  //           },
  //           {
  //             key: "myDocuments",
  //             text: "My Documents",
  //           },
  //           {
  //             key: "Test space Two",
  //             text: "Test space Two",
  //           },
  //           {
  //             key: "testlist",
  //             text: "testlist",
  //           },
  //         ]);
  //       }, 2000);
  //     }
  //   );
  // }

  // RENDERIZZARE TUTTE LE LISTE NEL DROPDOWN MENÙ
  private loadLists(): Promise<IDropdownOption[]> {
    return this._getListData().then((response) => {
      const options: IDropdownOption[] = response.value.map((list) => {
        return {
          key: list.Title,
          text: list.Title,
        };
      });
      return options;
    });
  }

  // METODO PER RENDEREIZZARE ITEM PREDEFINITI PER LISTA
  // private loadItems(): Promise<IDropdownOption[]> {
  //   if (!this.properties.listName) {
  //     // resolve to empty options since no list has been selected
  //     return Promise.resolve([]);
  //   }

  //   const wp: SpfxCourseWebPart = this;

  //   return new Promise<IDropdownOption[]>(
  //     (
  //       resolve: (options: IDropdownOption[]) => void,
  //       reject: (error: any) => void
  //     ) => {
  //       setTimeout(() => {
  //         const items = {
  //           sharedDocuments: [
  //             {
  //               key: "spfx_presentation.pptx",
  //               text: "SPFx for the masses",
  //             },
  //             {
  //               key: "hello-world.spapp",
  //               text: "hello-world.spapp",
  //             },
  //           ],
  //           myDocuments: [
  //             {
  //               key: "isaiah_cv.docx",
  //               text: "Isaiah CV",
  //             },
  //             {
  //               key: "isaiah_expenses.xlsx",
  //               text: "Isaiah Expenses",
  //             },
  //           ],
  //         };
  //         resolve(items[wp.properties.listName]);
  //       }, 2000);
  //     }
  //   );
  // }

  // METODO PER RESTITUIRE GLI ITEMS DI CIASCUNA LISTA SELEZIONATA NEL DROPDOWN
  private loadItems(): Promise<IDropdownOption[]> {
    console.log("STORE LIST PROPERTIES LOAD ITEMS", this.properties.storeList);
    if (!this.properties.storeList) {
      return Promise.resolve([]);
    }

    const url: string = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${this.properties.storeList}')/items`;

    return this.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json().then((json) => {
          console.log("RESPONSE LOAD ITEMS", json);
          const options: IDropdownOption[] = json.value.map((item) => {
            return {
              key: item.Title,
              text: item.Title,
            };
          });
          return options;
        });
      });
  }

  private onListItemChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => {
      return newValue;
    });
    // refresh web part
    this.render();
  }

  // METODO PER GESTIRE LA MODIFICA DEL VALORE NEL DROPDOWN
  private onListChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => {
      return newValue;
    });
    // reset selected item
    this.properties.item = undefined;
    // store new value in web part properties
    update(this.properties, "item", (): any => {
      return this.properties.item;
    });
    // refresh web part
    this.render();
    // reset selected values in item dropdown
    this.itemsDropDown.properties.selectedKey = this.properties.item;
    // allow to load items
    this.itemsDropDown.properties.disabled = false;
    // load items and re-render items dropdown
    this.itemsDropDown.render();
  }

  // ATTIVAZIONE DELLA MODALITÀ NON REATTIVA
  // @ts-ignore
  protected get disableReactivePropertyChanges(): boolean {
    return false;
  }

  // CHIAMATE HTTP
  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient
      .get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        console.log("response", response);
        return response.json();
      })
      .catch(() => {
        return Promise.resolve({ value: [] });
      });
  }

  private _getSingleListById(id: string): Promise<ISPList> {
    return this.context.spHttpClient
      .get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists('${id}')/items`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        console.log("responseSingleList", response);
        return response.json();
      })
      .catch(() => {
        return Promise.resolve({ Title: "", Id: "" });
      });
  }

  // VALIDAZIONE INLINE
  private validateDescription(value: string): string {
    if (value === null || value.trim().length === 0) {
      return "Provide a description";
    }

    if (value.length > 40) {
      return "Description should not be longer than 40 characters";
    }

    return "";
  }

  // VALIDAZIONE TRAMITE CHIAMATA HTTP
  private async validateListName(value: string): Promise<string> {
    if (value === null || value.length === 0) {
      return "Provide the list name";
    }

    try {
      let response = await this.context.spHttpClient.get(
        this.context.pageContext.web.absoluteUrl +
          `/_api/web/lists/getByTitle('${escape(value)}')?$select=Id`,
        SPHttpClient.configurations.v1
      );

      if (response.ok) {
        return "";
      } else if (response.status === 404) {
        console.log(value);
        return `List '${escape(value)}' doesn't exist in the current site`;
      } else {
        return `Error: ${response.statusText}. Please try again`;
      }
    } catch (error) {
      return error.message;
    }
  }

  public async render(): Promise<void> {
    const lists: ISPLists = await this._getListData();
    console.log("dataList", lists);

    let listProperties;
    if (lists.value.length > 0) {
      listProperties = await this._getSingleListById(lists.value[4].Id);
    }
    console.log("listProperties", listProperties);

    const element: React.ReactElement<ISpfxCourseProps> = React.createElement(
      SpfxCourse,
      {
        description: this.properties.description,
        test: this.properties.test,
        test1: this.properties.test1,
        test2: this.properties.test2,
        test3: this.properties.test3,
        context: this.context,
        list: lists,
        singlelist: listProperties,
        slider: this.properties.slider,
        link: {
          text: "Pagina del corso",
          href: "https://marcocrupi.it/",
          target: "_blank",
        },
        listName: this.properties.listName,
        storeList: this.properties.storeList,
        itemName: this.properties.item,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    this.itemsDropDown = new PropertyPaneAsyncDropdown("item", {
      label: strings.ItemFieldLabel,
      loadOptions: this.loadItems.bind(this),
      onPropertyChange: this.onListItemChange.bind(this),
      selectedKey: this.properties.item,
      // should be disabled if no list has been selected
      disabled: !this.properties.listName,
    });

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: "Description",
                  onGetErrorMessage: this.validateDescription.bind(this),
                }),
                PropertyPaneTextField("test", {
                  label: "Multi-line Text Field",
                  multiline: true,
                }),
                PropertyPaneCheckbox("test1", {
                  text: "Checkbox",
                }),
                PropertyPaneDropdown("test2", {
                  label: "Dropdown",
                  options: [
                    { key: "1", text: "One" },
                    { key: "2", text: "Two" },
                    { key: "3", text: "Three" },
                    { key: "4", text: "Four" },
                  ],
                }),
                PropertyPaneToggle("test3", {
                  label: "Toggle",
                  onText: "On",
                  offText: "Off",
                }),
                PropertyPaneSlider("slider", {
                  label: "Slider",
                  min: 0,
                  max: 100,
                  step: 1,
                }),
                PropertyPaneLink("link", {
                  text: "Pagina del corso",
                  href: "https://aka.ms/spfx",
                  target: "_blank",
                }),
                PropertyPaneTextField("listName", {
                  label: strings.ListNameFieldLabel,
                  // CONVALIDA VALORI TRAMITE API REMOTE
                  onGetErrorMessage: this.validateListName.bind(this),
                  // AUMENTO DEL RITARDO DI CONVALIDA
                  deferredValidationTime: 1500,
                }),
                PropertyPaneTextField("storeList", {
                  label: strings.ListFieldWriteLabel,
                }),
                new PropertyPaneAsyncDropdown("storeList", {
                  label: strings.ListFieldSelectLabel,
                  loadOptions: this.loadLists.bind(this),
                  onPropertyChange: this.onListChange.bind(this),
                  selectedKey: this.properties.storeList,
                }),
                this.itemsDropDown,
              ],
            },
          ],
        },
      ],
    };
  }
}
