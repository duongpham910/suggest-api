import React from 'react';
import FaquestionForm from './FaquestionForm';
import {Grid, Row, Col} from 'react-bootstrap';

class TagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faquestion: null,
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
