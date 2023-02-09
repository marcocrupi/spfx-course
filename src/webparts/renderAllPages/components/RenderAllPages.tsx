import * as React from "react";
import styles from "./RenderAllPages.module.scss";
import { IRenderAllPagesProps } from "./IRenderAllPagesProps";
import { escape } from "@microsoft/sp-lodash-subset";

export interface ISPList {
  Title: string;
  Description: string;
  Id: string;
  Created: string;
  BannerImageUrl: any;
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
                <div className={styles.allPages}>
                  {allPages.value.map((item: ISPList, index: number) => (
                    <div key={index} className={styles.boxPage}>
                      <img src={item.BannerImageUrl.Url} alt={item.Title} />
                      <h2>{item.Title}</h2>
                      <p>
                        <strong>Data di creazione:</strong> {item.Created}
                      </p>
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
