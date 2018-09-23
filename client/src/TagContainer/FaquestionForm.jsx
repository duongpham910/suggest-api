import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
import axios from 'axios';
import TagList from './TagList';

class FaquestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      tags: ['tag1', 'tag2', 'tag3'],
    };
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (type) => {
    let data = {
      faq: {
        question: this.state.question,
      }
    }

    let url = 'http://localhost:3001/api/v1/faquestions/suggest_tag'
    if (type === 'cosine') {
      url = 'http://localhost:3001/api/v1/faquestions/consine_similarity'
    }

    axios.get(url, {
      params: data
    }).then(response => {
      this.setState({
        tags: response.data.data
      });
    }).catch(error => {
      console.error(error);
    })
  }

  render() {
    return(
      <div>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Question</ControlLabel>
          <FormControl
            name="question"
            type="text"
            placeholder="Enter text"
            onChange={this.handleInput}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
          <Button
            bsStyle="primary"
            type="submit"
            onClick={() => this.handleSubmit("normal")}>
            Submit
          </Button>
          <Button
            bsStyle="primary"
            type="submit"
            onClick={() => this.handleSubmit("cosine")}>
            Cosine Similarity
          </Button>
        </FormGroup>
        <TagList
          tags = {this.state.tags}
        />
      </div>
    );
  }
}

export default FaquestionForm
