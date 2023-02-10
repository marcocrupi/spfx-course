import * as React from "react";
import styles from "./GrapApiTest.module.scss";
import { IGrapApiTestProps } from "./IGrapApiTestProps";
import { escape } from "@microsoft/sp-lodash-subset";

import { MSGraphClient } from "@microsoft/sp-http";
import {
  PrimaryButton,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode,
} from "office-ui-fabric-react";
import { IConnectWithMsGraphClientState } from "./IConnectWithMsGraphClientState";
import { IUserInfo } from "./IUserInfo";

// Configure the columns for the DetailsList component
let _usersListColumns = [
  {
    key: "displayName",
    name: "Display name",
    fieldName: "displayName",
    minWidth: 50,
    maxWidth: 100,
    isResizable: true,
  },
  {
    key: "mail",
    name: "Mail",
    fieldName: "mail",
    minWidth: 50,
    maxWidth: 100,
    isResizable: true,
  },
  {
    key: "userPrincipalName",
    name: "User Principal Name",
    fieldName: "userPrincipalName",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  },
];

export default class GrapApiTest extends React.Component<
  IGrapApiTestProps,
  IConnectWithMsGraphClientState
> {
  constructor(props: IGrapApiTestProps, state: IConnectWithMsGraphClientState) {
    super(props);

    // Initialize the state of the component
    this.state = {
      users: [],
    };
  }

  private getUserDetails(): void {
    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        // Get user information from the Microsoft Graph
        client
          .api("users")
          .version("v1.0")
          .select("displayName,mail,userPrincipalName")
          .get((error, result: any, rawResponse?: any) => {
            // handle the response
            if (error) {
              console.log(error);
              return;
            }

            // Prepare the output array
            var users: Array<IUserInfo> = new Array<IUserInfo>();

            // Map the JSON response to the output array
            result.value.map((item: any) => {
              users.push({
                displayName: item.displayName,
                mail: item.mail,
                userPrincipalName: item.userPrincipalName,
              });
            });

            // Update the component state accordingly to the result
            this.setState({
              users: users,
            });
          });
      });
  }

  public render(): React.ReactElement<IGrapApiTestProps> {
    return (
      <div className={styles.grapApiTest}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Microsoft Graph</span>
              <p className={styles.subTitle}>Consume MS Graph with SPFx!</p>
              <p className={styles.description}>
                {escape(this.props.description)}
              </p>

              <p>
                <PrimaryButton
                  text="Search"
                  title="Search"
                  onClick={() => this.getUserDetails()}
                />
              </p>
              {this.state.users != null && this.state.users.length > 0 ? (
                <p>
                  <DetailsList
                    items={this.state.users}
                    columns={_usersListColumns}
                    setKey="set"
                    checkboxVisibility={CheckboxVisibility.hidden}
                    selectionMode={SelectionMode.none}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    compact={true}
                  />
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
