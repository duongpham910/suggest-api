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
    let data = {
      faq: {
        title: this.state.title,
        question: this.state.question,
        answer: this.state.answer,
      }
    }

    axios.get('http://localhost:3001/api/v1/faquestions/suggest_tag', {
      params: data
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    })
  }

  render() {
    return(
      <FormGroup
        controlId="formBasicText"
      >
        <ControlLabel>Title</ControlLabel>
        <FormControl
          name="title"
          type="text"
          placeholder="Enter text"
          onChange={this.handleInput}
        />
        <FormControl.Feedback />
        <HelpBlock>Validation is based on string length.</HelpBlock>
        <ControlLabel>Question</ControlLabel>
        <FormControl
          name="question"
          type="text"
          placeholder="Enter text"
          onChange={this.handleInput}
        />
        <FormControl.Feedback />
        <HelpBlock>Validation is based on string length.</HelpBlock>
        <ControlLabel>Answer</ControlLabel>
        <FormControl
          name="answer"
          type="text"
          placeholder="Enter text"
          onChange={this.handleInput}
        />
        <FormControl.Feedback />
        <HelpBlock>Validation is based on string length.</HelpBlock>
        <Button
          bsStyle="primary"
          type="submit"
          onClick={this.handleSubmit}>
          Submit
        </Button>
      </FormGroup>
    );
  }
}

export default FaquestionForm
