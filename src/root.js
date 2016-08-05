import React from 'lib/react';
import ReactDOM from 'lib/react-dom';
import { Router, Route, Redirect, browserHistory } from 'lib/react-router';
import App from 'app';
import Known from 'component/page/known';
import Prediction from 'component/page/prediction';
import Target from 'component/page/target';
import 'css/custom/icon.css';
import 'css/custom/mdl.css';
import 'css/custom/chartist.css';
import 'css/custom/index.css';

const scrollTop = () => {
  document.getElementsByTagName('main')[0].scrollTop = 0;
};

const routes =
  <Router onUpdate={() => scrollTop()} history={browserHistory}>
    <Redirect from="/" to="known"/>
    <Route path="/" component={App}>
      <Route path="known" component={Known} />
      <Route path="prediction" component={Prediction} />
      <Route path="target" component={Target} />
      <Redirect from="*" to="known"/>
    </ Route>
  </ Router>
;

ReactDOM.render(routes, document.getElementById('app-ficalculator'));
