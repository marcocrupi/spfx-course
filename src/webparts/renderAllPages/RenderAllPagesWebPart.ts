import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "RenderAllPagesWebPartStrings";
import RenderAllPages from "./components/RenderAllPages";
import { IRenderAllPagesProps } from "./components/IRenderAllPagesProps";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface IRenderAllPagesWebPartProps {
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

export default class RenderAllPagesWebPart extends BaseClientSideWebPart<IRenderAllPagesWebPartProps> {
  private _getSitePages(): Promise<ISPLists> {
    return this.context.spHttpClient
      .get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Site%20Pages')/items`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .catch(() => {
        return Promise.resolve({ value: [] });
      });
  }

  public async render(): Promise<void> {
    const pagesList: ISPLists = await this._getSitePages();
    console.log("dataList PAGES", pagesList);

    const element: React.ReactElement<IRenderAllPagesProps> =
      React.createElement(RenderAllPages, {
        description: this.properties.description,
        allPages: pagesList,
      });

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
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
