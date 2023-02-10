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
  private filterPages(pages: any, keyword: string): any {
    return pages.filter((page) =>
      page.Title.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  public render(): React.ReactElement<IRenderAllPagesProps> {
    const { allPages, filter } = this.props;

    const filteredPages = this.filterPages(
      allPages.value,
      filter ? filter : ""
    );

    return (
      <div className={styles.renderAllPages}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <h1 className={styles.title}>ALL PAGES</h1>

              <div>
                <div className={styles.allPages}>
                  {filteredPages.map((item: ISPList, index: number) => (
                    <div key={index} className={styles.boxPage}>
                      <img src={item.BannerImageUrl.Url} alt={item.Title} />
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
