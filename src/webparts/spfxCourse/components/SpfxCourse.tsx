import * as React from "react";
import styles from "./SpfxCourse.module.scss";
import { ISpfxCourseProps } from "./ISpfxCourseProps";
import { escape } from "@microsoft/sp-lodash-subset";

export interface ISPList {
  Title: string;
  Id: string;
}

export default class SpfxCourse extends React.Component<ISpfxCourseProps, {}> {
  public render(): React.ReactElement<ISpfxCourseProps> {
    return (
      <div className={styles.spfxCourse}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Share Point Course</span>
              <p className={styles.description}>
                Web part property value:{escape(this.props.description)}
              </p>
              <p>${escape(this.props.test)}</p>
              <p>${this.props.test1.toString()}</p>
              <p>${escape(this.props.test2)}</p>
              <p>${this.props.test3.toString()}</p>
              <p>
                Page Context, username:{" "}
                {this.props.context.pageContext.user.displayName}
              </p>
              <p>
                Page Context, web part title:{" "}
                {escape(this.props.context.pageContext.web.title)}
              </p>
              <div>
                <h2>RENDER LIST</h2>
                <ul>
                  {this.props.list.value.map((item: ISPList, index: number) => (
                    <li key={index}>{item.Title}</li>
                  ))}
                </ul>
              </div>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
