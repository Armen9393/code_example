import React from "react";
import "./index.scss";

interface IProps {
  name: string,
  options: Array<any>,
  value: Array<string | number>,
  setFieldValue: Function,
  width?: string,
  height?: string,
  className?: string,
};

interface IState {
  isOpen: boolean;
  value: Array<string | number>
};

class MultiSelect extends React.Component<IProps, IState> {
  public state: IState = {
    isOpen: false,
    value: [],
  }

  close = () => this.setState({ isOpen: false });
  open = () => this.setState({ isOpen: true });

  public handleClick = (elem: number | string) => () => {
    const { value } = this.props;
    const element = elem.toString();
    if (value.includes(element)) {
      value.splice(value.indexOf(element), 1);
    } else {
      value.push(element);
    }
    this.setValue(value);
  };

  public renderLabel = () => {

    const { value } = this.props;
    if (value && value.length) {
      return `Selected ${value.length} option${value.length === 1 ? "" : "s"}`
    }
    return "Status";
  };

  public renderOptions = () => {
    const { options, value } = this.props;

    return options.map((option) => (
      <div
        className={`option ${value && value.map((item) => item === String(option.id) ? " option-active " : "")}`}
        key={option.id}
        onClick={this.handleClick(option.id)}
      >
        {option.label}
      </div>
    ));
  };

  public setValue = (value: Array<string | number>) => {
    this.props.setFieldValue(value);
    this.setState({ value })
  };

  render() {

    const { isOpen } = this.state;
    const { width, height, className } = this.props;

    return (
      <div className={`multi-select ${isOpen ? "open" : "closed"} ${className ? className : ""}`}>
        <div className="P-field" style={{ width, height }} onClick={isOpen ? this.close : this.open}>
          <div className="label">{this.renderLabel()}</div>
          <button
            className="G-cursor P-arrow">
            <i className={`icon-ic_arrowdown ${isOpen ? 'G-arrow-animation' : ''}`} />
          </button>
        </div>
        {isOpen ? <div className="options">{this.renderOptions()}</div> : null}
        {isOpen ? <div className="overlay" onClick={this.close} /> : null}
      </div>
    );
  }

}

export default MultiSelect;
