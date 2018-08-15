import React from 'react';
import FaquestionForm from './FaquestionForm';

class TagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faquestion: null,

    };
  }

  handleChange = (e) => {
    this.setState({
      faquestion: e.target.value
    });
  }

  render(){
    return (
      <FaquestionForm />
    );
  }
}

export default TagContainer
