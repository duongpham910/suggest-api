import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import cities from './cities.json';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return cities.filter(city => regex.test(city.name));
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Find your location...",
      value,
      onChange: this.onChange
    };

    return(
      <div>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Search FAQ</ControlLabel>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />

        </FormGroup>
      </div>
    );
  }
}

export default SearchForm

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
