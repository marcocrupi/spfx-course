import { Log } from "@microsoft/sp-core-library";
import { override } from "@microsoft/decorators";
import * as React from "react";

import styles from "./FirstFieldCustomizer.module.scss";

export interface IFirstFieldCustomizerProps {
  text: string;
  event: any;
}

const LOG_SOURCE: string = "FirstFieldCustomizer";

export default class FirstFieldCustomizer extends React.Component<
  IFirstFieldCustomizerProps,
  {}
> {
  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, "React Element: FirstFieldCustomizer mounted");
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, "React Element: FirstFieldCustomizer unmounted");
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.FirstFieldCustomizer}>
        <div className={styles.full}>
          <div
            style={{
              width: this.props.event.fieldValue + "px",
              background: "#0094ff",
              color: "white",
            }}
          >
            &nbsp; {this.props.event.fieldValue} %
          </div>
        </div>
      </div>
    );
  }
}
