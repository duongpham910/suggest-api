import React from 'react'
import {ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

class TagList extends React.Component {

  renderTagList() {
    return (
      <ListGroup>
        {
          this.props.tags.map((tag, index) => {
            let style = (index % 2) === 1 ? 'info' : 'warning';
            return (
              <ListGroupItem key={index} bsStyle={style}>{tag}</ListGroupItem>
            )
          })
        }
      </ListGroup>
    );
  }

  render() {
    return (
      <div>
        <hr/>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Tags</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{this.renderTagList()}</Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default TagList
