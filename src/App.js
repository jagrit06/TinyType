import './App.css';
import React from 'react';

function Tile(props) {
  return (
    <button className="button" onClick={props.onClick} style={{height:"0.5cm", width:"1cm", fontSize: '10px'}}>
      {props.value}
    </button>
  );
}

const defaultTopRow = ["ABCD", "EFGH", "IJKL", "MNOP"];
const defaultBtmRow = ["QRST", "UVWX", "YZ<", "_"];

class InputArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topRow:  defaultTopRow,
      bottomRow: defaultBtmRow,
      rowExpanded: -1,
      input  : "",
    };
  }

  handleClick(i) {
    let rowExpanded = this.state.rowExpanded;
    let topRow = this.state.topRow.slice();
    let bottomRow = this.state.bottomRow.slice();
    let input = this.state.input;

    // Click on top row
    if(i < 4){

      // If the other row is expanded, send back to default
      if(rowExpanded === 1){
        bottomRow = defaultBtmRow;
        rowExpanded = -1;
      }

      // If this row is expanded, send selection to input
      else if(rowExpanded === 0){
        input += topRow[i];
        topRow = defaultTopRow;
        rowExpanded = -1;
      }

      // If no rows are expanded, expand this one
      else if(rowExpanded === -1){
        topRow = topRow[i].split("", 4);
        rowExpanded = 0;
      }

    }
    // Click on bottom row
    else{

      // If the other row is expanded, send back to default
      if(rowExpanded === 0){
        topRow = defaultTopRow;
        rowExpanded = -1;
      }

      // If this row is expanded, send selection to input
      else if(rowExpanded === 1){
        // If delete 
        if(bottomRow[i-4] === '<'){
          input = input.substr(0, input.length-1);
          bottomRow = defaultBtmRow;
          rowExpanded = -1;
        }
        // If lowercase
        else if(bottomRow[i-4] === ''){

        }
        // If regular letter
        else{
          input += bottomRow[i-4];
          bottomRow = defaultBtmRow;
          rowExpanded = -1;
        }
      }

      // If no rows are expanded, expand this one
      else if(rowExpanded === -1){
        // If space, no need to expand
        if(i === 7){
          input += " ";
        }
        else{
          bottomRow = bottomRow[i-4].split("", 4);
          rowExpanded = 1;
        }
      }

    }

    this.setState({
      topRow:  topRow,
      bottomRow: bottomRow,
      rowExpanded: rowExpanded,
      input  : input,
    });
  }

  renderTile(i) {
    const disp = (i < 4) ? this.state.topRow[i] :  this.state.bottomRow[i-4]
    return (
      <Tile
        value={disp}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const input = " " + this.state.input + "_";

    return (
      <div>
        <div className="input">{input}</div>
        <div className="input-row">
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
          {this.renderTile(3)}
        </div>
        <div className="input-row">
          {this.renderTile(4)}
          {this.renderTile(5)}
          {this.renderTile(6)}
          {this.renderTile(7)}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">

        <div className="input-label">
          Input:
        </div>

        <div className="input-area">
          <InputArea />
        </div>

      </div>
    );
  }
}

export default App;
