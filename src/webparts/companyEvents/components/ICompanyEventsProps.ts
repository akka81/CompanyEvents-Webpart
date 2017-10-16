import { IWebPartContext } from "@microsoft/sp-webpart-base";

export interface ICompanyEventsProps {
  description: string;
  siteUrl: string;
  digest:string;
  spContext: IWebPartContext;
}


export interface ICompanyEventsState {
  mailstatus:string;
}
