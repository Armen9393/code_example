import React from 'react';
import Modal from 'react-modal';
import Sidebar from './sidebar/index';
import Chart from './chart/index';
import "react-datepicker/dist/react-datepicker.css";
import './app.scss';

Modal.setAppElement(document.getElementById('root'));

Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.5)",
    zIndex: 3,
  },
  content: {
    position: "absolute",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
  }
};

const App: React.SFC = () => {
  return (
    <div className="G-flex G-justify-center P-app">
      <Sidebar />
      <Chart />
    </div>
  );
}

export default React.memo(App);