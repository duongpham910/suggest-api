import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import ElasticSearch from "./ElasticSearchContainer"
import Tag from "./TagContainer";

const router = (
  <Router>
    <div>
      <Route exact path="/" component={Tag} />
      <Route path="/elasticsearch" component={ElasticSearch} />
    </div>
  </Router>
)

export default router;
