import * as React from 'react';
import ClickOutside from '../click-outside';
import "./index.scss"

export interface IToolBarProps {
    width?: string,
    height?: string,
    children: any,
    className?: string,
}

export interface IToolBarState {
    toolbar: boolean,
}

class ToolBar extends React.Component<IToolBarProps, IToolBarState> {
    public state: IToolBarState = {
        toolbar: false,
    }

    private toggleToolbar = () => {
        const { toolbar } = this.state;
        this.setState({ toolbar: !toolbar })
    }

    render() {
        const { width, height, className } = this.props;
        const { toolbar } = this.state;
        return (
            <div className="P-toolbar-wrapper">
                <ClickOutside onClickOutside={() => this.setState({ toolbar: false })}>
                    <i onClick={this.toggleToolbar} className="icon-ic_more P-icon-ic_more"></i>
                    <div className={`P-toolbar-component ${toolbar ? "" : "P-toolbar-hidden"}`}>
                        <ul className={`P-toolbar ${className}`} style={{ width, height }}>
                            <div onClick={this.toggleToolbar} className="P-children-wrapper">
                                {this.props.children}
                            </div>
                        </ul>
                    </div>
                </ClickOutside>
            </div>
        );
    }
}

export default ToolBar;