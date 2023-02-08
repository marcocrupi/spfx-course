import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown,
} from "@microsoft/sp-property-pane";
import {
  BaseClientSideWebPart,
  WebPartContext,
  IWebPartPropertiesMetadata,
} from "@microsoft/sp-webpart-base";

import * as strings from "SpfxCourseWebPartStrings";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import SpfxCourse from "./components/SpfxCourse";
import { ISpfxCourseProps } from "./components/ISpfxCourseProps";
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
  link: string;
}
export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;

  Id: string;
}

export default class SpfxCourseWebPart extends BaseClientSideWebPart<ISpfxCourseWebPartProps> {
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
        link: this.properties.link,
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
              ],
            },
          ],
        },
      ],
    };
  }
}
