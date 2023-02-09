import * as React from "react";
import styles from "./RenderAllPages.module.scss";
import { IRenderAllPagesProps } from "./IRenderAllPagesProps";
import { escape } from "@microsoft/sp-lodash-subset";
import * as moment from "moment";

export interface ISPList {
  Title: string;
  Description: string;
  Id: string;
  Created: string;
}

export default class RenderAllPages extends React.Component<
  IRenderAllPagesProps,
  {}
> {
  public render(): React.ReactElement<IRenderAllPagesProps> {
    const { allPages } = this.props;
    return (
      <div className={styles.renderAllPages}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <h1 className={styles.title}>ALL PAGES</h1>

              <div>
                <div>
                  {allPages.value.map((item: ISPList, index: number) => (
                    <div key={index}>
                      <img
                        src={
                          "https://miro.medium.com/max/880/0*cesFJY5JFpI0Rl4v.jpg"
                        }
                        alt={item.Title}
                      />
                      <h2>{item.Title}</h2>
                      <p>Data di creazione: {item.Created}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
