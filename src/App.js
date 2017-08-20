import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  FormControl,
  Glyphicon
} from 'react-bootstrap';

let isPlaying = false;
let inputTime = 0;
let intervalID = '';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      timerButtonText: 'play',
      timerButtonColor: 'success'
    };
  }

  handleChange = event => {
    inputTime = event.target.value;
  };

  timerPlayPause = () => {
    if (!isPlaying) {
      this.setState({
        timer: inputTime,
        timerButtonText: 'pause',
        timerButtonColor: 'warning'
      });
      intervalID = setInterval(this.countdown, 1000);
      isPlaying = true;
    } else {
      clearInterval(intervalID);
      this.setState({
        timerButtonText: 'play',
        timerButtonColor: 'success'
      });
      isPlaying = false;
    }
  };

  countdown = () => {
    if (this.state.timer === 0) {
      clearInterval(intervalID);
      this.setState({
        timerButtonText: 'play',
        timerButtonColor: 'success'
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
      timerButtonText: 'play',
      timerButtonColor: 'success'
    });
  };

  showResetButton = () => {
    if (this.state.timerButtonText === 'pause') {
      return (
        <Button bsStyle="danger" block bsSize="large" onClick={this.timerReset}>
          <Glyphicon glyph="stop" />
        </Button>
      );
    } else {
      return <div />;
    }
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={2} lgOffset={5}>
            <div
              style={{
                fontSize: '10em',
                textAlign: 'center'
              }}
              className="timer"
            >
              {this.state.timer}
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={2} lgOffset={5}>
            <FormControl
              type="number"
              bsSize="lg"
              placeholder="enter"
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={2} lgOffset={5}>
            <Button
              style={{
                marginBottom: '10px',
                marginTop: '30px'
              }}
              block
              className="buttons"
              bsStyle={this.state.timerButtonColor}
              bsSize="large"
              onClick={this.timerPlayPause}
            >
              <Glyphicon glyph={this.state.timerButtonText} />
            </Button>
          </Col>
          <Col lg={2} lgOffset={5}>
            {this.showResetButton()}
          </Col>
        </Row>
      </Grid>
    );
  }
}
