import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import SearchForm from './SearchForm';

class ElasticSearchContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={2}>
            </Col>
            <Col md={8}>
              <SearchForm />
            </Col>
            <Col md={2}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ElasticSearchContainer
