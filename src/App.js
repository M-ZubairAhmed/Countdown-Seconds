import React, { Component } from 'react';

let isPlaying = false;
let inputTime = 0;
let intervalID = '';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      timerButtonText: 'Start'
    };
  }

  handleChange = event => {
    inputTime = event.target.value;
  };

  timerPlayPause = () => {
    if (!isPlaying) {
      this.setState({
        timer: inputTime,
        timerButtonText: 'Pause'
      });
      intervalID = setInterval(this.countdown, 1000);
      isPlaying = true;
    } else {
      console.log('pause');
      clearInterval(intervalID);
      this.setState({
        timerButtonText: 'Resume'
      });
      isPlaying = false;
    }
  };

  countdown = () => {
    console.log('a');
    if (this.state.timer === 0) {
      clearInterval(intervalID);
      this.setState({
        timerButtonText: 'Start'
      });
      isPlaying = false;
    } else {
      this.setState({
        timer: this.state.timer - 1
      });
      inputTime = inputTime - 1;
    }
  };

  timerReset = () => {
    clearInterval(intervalID);
    inputTime = 0;
    isPlaying = false;
    this.setState({
      timer: 0,
      timerButtonText: 'Start'
    });
  };

  showResetButton = () => {
    if (this.state.timerButtonText === 'Resume') {
      return <button onClick={this.timerReset}>Reset</button>;
    } else {
      return <div />;
    }
  };

  render() {
    return (
      <div>
        {this.state.timer}
        <input type="number" placeholder="enter" onChange={this.handleChange} />
        <button onClick={this.timerPlayPause}>
          {this.state.timerButtonText}
        </button>
        {this.showResetButton()}
      </div>
    );
  }
}
