import React from 'react';
import FaquestionForm from './FaquestionForm';
import TagList from './TagList';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col, Button} from 'react-bootstrap';

class TagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faquestion: null,
      tags: ["1","2","3"],
    };
  }

  render(){
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={2}>
            </Col>
            <Col md={8}>
              <FaquestionForm />
              <TagList
                tags = {this.state.tags}
              />
            </Col>
            <Col md={2}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TagContainer
