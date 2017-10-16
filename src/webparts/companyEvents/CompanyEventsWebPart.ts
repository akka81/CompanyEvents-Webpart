import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "CompanyEventsWebPartStrings";
import CompanyEvents from "./components/CompanyEvents";
import { ICompanyEventsProps } from "./components/ICompanyEventsProps";
import { IDigestCache, DigestCache } from "@microsoft/sp-http";
export interface ICompanyEventsWebPartProps {
  description: string;
}

export default class CompanyEventsWebPart extends BaseClientSideWebPart<ICompanyEventsWebPartProps> {

  spDigest:string;

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      const digestCache: IDigestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
      digestCache.fetchDigest(this.context.pageContext.web.serverRelativeUrl).then((digest: string): void => {
        this.spDigest = digest;
        resolve();
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ICompanyEventsProps > = React.createElement(
      CompanyEvents,
      {
        description: this.properties.description,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        digest: this.spDigest,
        spContext: this.context
      }

    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
