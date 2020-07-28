import * as React from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
  onClickOutside?(): void;
};

class ClickOutside extends React.PureComponent<IProps, {}> {

  private container = React.createRef<HTMLDivElement>();

  public componentWillUnmount() {
    document.removeEventListener('click', this.handle, false);
  }

  componentDidUpdate(){
    document.addEventListener('click', this.handle, false);
  }

  private handle = (e: MouseEvent) => {
    const { onClickOutside } = this.props;
    if (this.container.current && !this.container.current.contains(e.target as HTMLElement) && onClickOutside) {
      onClickOutside();
      document.removeEventListener('click', this.handle, false);
    }
  };

  public render() {
    const { children, onClickOutside, ...props } = this.props;
    return <div  {...props} ref={this.container}>{children}</div>;
  }
}

export default ClickOutside;
