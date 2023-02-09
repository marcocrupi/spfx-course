import * as React from "react";
import styles from "./SpfxCourse.module.scss";
import { ISpfxCourseProps } from "./ISpfxCourseProps";
import { escape } from "@microsoft/sp-lodash-subset";
import AsyncDropDown from "./AsyncDropDown/AsyncDropDown";
import { IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";

export interface IAsyncDropdownState {
  loading: boolean;
  options: IDropdownOption[];
  error: string;
}

export interface ISPList {
  Title: string;
  Description: string;
  Id: string;
}
export default class SpfxCourse extends React.Component<
  ISpfxCourseProps,
  { showSingleList: boolean }
> {
  constructor(props: ISpfxCourseProps) {
    super(props);
    this.state = {
      showSingleList: false,
    };
  }

  public toggleSingleList = (index: number) => {
    if (index === 4) {
      this.setState({ showSingleList: !this.state.showSingleList });
    }
  };

  public render(): React.ReactElement<ISpfxCourseProps> {
    return (
      <div className={styles.spfxCourse}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Share Point Course</span>
              <p className={styles.description}>
                Web part property value: {escape(this.props.description)}
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
                <ul className={styles.list}>
                  {this.props.list.value.map((item: ISPList, index: number) => (
                    <li
                      className={styles.listItem}
                      key={index}
                      onClick={() => this.toggleSingleList(index)}
                    >
                      <span className="ms-font-l">{item.Title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {this.state.showSingleList && (
                <div className="singleList">
                  <h2>RENDER LIST ITINERARIO</h2>
                  <ul className={styles.list}>
                    {this.props.singlelist.value.map(
                      (item: ISPList, index: number) => (
                        <li className={styles.listItem} key={index}>
                          <div className="ms-font-l">Titolo: {item.Title}</div>
                          <div className="ms-font-l">
                            Descrizione: {item.Description}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              <div>
                <h2>Slider value: {this.props.slider.toString()}</h2>
              </div>
              <div>
                List name: <strong>{escape(this.props.storeList)}</strong>
              </div>
              <div>
                Item name: <strong>{escape(this.props.itemName)}</strong>
              </div>
              <div>
                <a href={this.props.link.href} className={styles.button}>
                  <span className={styles.label}>{this.props.link.text}</span>
                </a>
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
