import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

class FaquestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      title: '',
      answer: '',
    };
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    // let data = {idea: {title: this.state.title, body: this.state.body}}
    // $.ajax({
    //   url: `http://localhost:3001/api/v1/ideas/${this.state.id}`,
    //   method: 'PATCH',
    //   data: data,
    //   success: (response) => {
    //     console.log(response)
    //   },
    //   error: (xhr, status, err) => {
    //     console.log('false');
    //   }
    // });
    let data = {
      faquestion: {
        title: this.state.title,
        question: this.state.question,
        answer: this.state.answer,
      }
    }
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/v1/faquestions',
      data: data
    }).then(response => {

    }).catch(error => {
      console.error(error);
    })
  }

  render() {
    return(
      <FormGroup
        controlId="formBasicText"
      >
        <Grid>
          <Row className="show-grid">
            <Col md={2}>
            </Col>
            <Col md={8}>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                name="title"
                type="text"
                placeholder="Enter text"
                onChange={this.handleInput}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </Col>
            <Col md={2}>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={2}>
            </Col>
            <Col md={8}>
              <ControlLabel>Question</ControlLabel>
              <FormControl
                name="question"
                type="text"
                placeholder="Enter text"
                onChange={this.handleInput}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </Col>
            <Col md={2}>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={2}>
            </Col>
            <Col md={8}>
              <ControlLabel>Answer</ControlLabel>
              <FormControl
                name="answer"
                type="text"
                placeholder="Enter text"
                onChange={this.handleInput}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </Col>
            <Col md={2}>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={2}>
            </Col>
            <Col md={8}>
              <Button
                bsStyle="primary"
                type="submit"
                onClick={this.handleSubmit}>
                Submit
              </Button>
            </Col>
            <Col md={2}>
            </Col>
          </Row>
        </Grid>
      </FormGroup>
    );
  }
}

export default FaquestionForm
