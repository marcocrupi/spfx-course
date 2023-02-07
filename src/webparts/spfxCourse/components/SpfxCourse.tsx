import * as React from "react";
import styles from "./SpfxCourse.module.scss";
import { ISpfxCourseProps } from "./ISpfxCourseProps";
import { escape } from "@microsoft/sp-lodash-subset";

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
              <p>${this.props.test1}</p>
              <p>${escape(this.props.test2)}</p>
              <p>${this.props.test3}</p>
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
