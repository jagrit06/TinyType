import './App.css';
import React from 'react';

function Tile(props) {
  return (
    <button className="button" onClick={props.onClick} style={{height:"0.5cm", width:"1cm", fontSize: '10px'}}>
      {props.value}
    </button>
  );
}

function _defaultBtmRow(isUpper) {
  if(isUpper) {
    return ["QRST", "UVWX", "YZ<" + String.fromCharCode(9663), "_"];
  }
  return ["qrst", "uvwx", "yz<" + String.fromCharCode(9653), "_"];
}

function _defaultTopRow(isUpper) {
  if(isUpper) {
    return ["ABCD", "EFGH", "IJKL", "MNOP"];
  }
  return ["abcd", "efgh", "ijkl", "mnop"];
}

class InputArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topRow:  _defaultTopRow(true),
      bottomRow: _defaultBtmRow(true),
      rowExpanded: -1,
      input  : "",
      isUpper : true,
    };
  }

  handleClick(i) {
    let rowExpanded = this.state.rowExpanded;
    let topRow = this.state.topRow.slice();
    let bottomRow = this.state.bottomRow.slice();
    let input = this.state.input;
    let isUpper = this.state.isUpper;

    // Click on top row
    if(i < 4){

      // If the other row is expanded, send back to default
      if(rowExpanded === 1){
        bottomRow = _defaultBtmRow(isUpper);
        rowExpanded = -1;
      }

      // If this row is expanded, send selection to input
      else if(rowExpanded === 0){
        input += topRow[i];
        topRow = _defaultTopRow(isUpper);
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
        topRow = _defaultTopRow(isUpper);
        rowExpanded = -1;
      }

      // If this row is expanded, send selection to input
      else if(rowExpanded === 1){
        // If delete 
        if(bottomRow[i-4] === '<'){
          input = input.substr(0, input.length-1);
          bottomRow = _defaultBtmRow(isUpper);
          rowExpanded = -1;
        }

        // If to upper case
        else if(bottomRow[i-4] === String.fromCharCode(9653)){
          isUpper = true;
          bottomRow = _defaultBtmRow(isUpper);
          topRow = _defaultTopRow(isUpper);
          rowExpanded = -1;
        }

        // If to lower case
        else if(bottomRow[i-4] === String.fromCharCode(9663)){
          isUpper = false;
          bottomRow = _defaultBtmRow(isUpper);
          topRow = _defaultTopRow(isUpper);
          rowExpanded = -1;
        }

        // If regular letter
        else{
          input += bottomRow[i-4];
          bottomRow = _defaultBtmRow(isUpper);
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
      isUpper : isUpper
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

  renderTile(i) {
    return (
      <Tile
        value={i}
        onClick={() => {;}}
      />
    );
  }

  renderInstructions() {
    return (
      <div className='instructions'>

        <b>Instructions</b>

        <ol>
          <li> <p> Click on the box&nbsp;{this.renderTile("ABCD")}&nbsp;containing desired letter</p> </li>
          <li> <p> Click on the desired letter when the box expands&nbsp;{this.renderTile("A")}{this.renderTile("B")}{this.renderTile("C")}{this.renderTile("D")}&nbsp;</p> </li>
        </ol>

        <b>Legend</b>

        <ul style={{"list-style-type":"none"}}>
          <li> <p> _  : Space </p> </li>
          <li> <p> &#60; : Backspace/Delete </p> </li>
          <li> <p> {String.fromCharCode(9651)} : Switch to uppercase mode </p> </li>
          <li> <p> {String.fromCharCode(9661)} : Switch to lowercase mode </p> </li>
        </ul>

        <b>Note</b>

        <ul>
          <li> <p> You can click on the other row to collapse an expanded box without adding any text</p></li>
          <li> <p> Clicking space ( _ ) directly adds a space to the text </p></li>
        </ul>

      </div>
    );
  }

  renderHeading() {
    return (
      <div>
        <h1>TinyType</h1>

        <h3>Jagrit Digani</h3>
        <h4> <i>705306718</i></h4>

      </div>
    );
  }

  render() {
    return (
      <div>

        {this.renderHeading()}
      
        <div className="app">

          <div className='container'>

            <div className="input-label">
              <b> Input </b>
            </div>

            <div className="input-area">
              <InputArea />
            </div>

          </div>

        </div>

        {this.renderInstructions()}

      </div>
    );
  }
}

export default App;
