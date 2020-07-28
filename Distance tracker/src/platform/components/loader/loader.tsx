import * as React from 'react';
import "./loader.css"

class Loader extends React.Component {
    public render() {
        return (
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>);
    }
}

export default Loader;