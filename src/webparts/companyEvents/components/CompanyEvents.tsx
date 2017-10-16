import * as React from "react";
import styles from "./CompanyEvents.module.scss";
import { ICompanyEventsProps, ICompanyEventsState } from "./ICompanyEventsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import {SPHttpClient,SPHttpClientResponse} from "@microsoft/sp-http";
import AgendaItem from "../dto/AgendaItem";
import CompanyEvent from "../dto/CompanyEvent";

export default class CompanyEvents extends React.Component<ICompanyEventsProps, ICompanyEventsState> {

  spUrl:string;
  pageUrl:URL;
  itemId:number;
  test:AgendaItem;
  test1:CompanyEvent;

  constructor(props:any) {
    super(props);
    this.state = {mailstatus: ""};
    this.handleSendMail = this.handleSendMail.bind(this);

     this.pageUrl = new URL(window.location.href);
     // this.itemId = parseInt(this.pageUrl.searchParams.get("iditem"));
  }

  // mail send click
  protected handleSendMail():void {

  this.spUrl = this.props.spContext.pageContext.web.absoluteUrl+"/_api/SP.Utilities.Utility.SendEmail";

  const body:string = JSON.stringify({
    "properties": {
      "__metadata": {
          "type": "SP.Utilities.EmailProperties"
      },
      "From": "marco.acchini@reti.it",
      "To": {
          "results": ["marco.acchini@reti.it"]
      },
      "Body": "test body from sharepoint online",
      "Subject": "test mail"
  }
  });

  this.props.spContext.httpClient.post(
    this.spUrl,
    SPHttpClient.configurations.v1,
    {headers:  {
      "Accept": "application/json;odata=verbose",
      "Content-Type": "application/json;odata=verbose",
      "X-RequestDigest":this.props.digest
    },
      body: body
    }).then((succ)=> {
      this.setState({mailstatus:"successfully sent"});
    },(err)=> {this.setState({mailstatus:err});
  });
}

  public render(): React.ReactElement<ICompanyEventsProps> {
    return (
      <div className={styles.companyEvents}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
              <p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.siteUrl)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
              <button onClick={this.handleSendMail}>
                 test send mail
              </button>
              <span>{this.state.mailstatus}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
