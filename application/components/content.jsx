import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home-page';
import MyCollection from '../pages/MyCollection-page';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/my-collection' component={MyCollection}/>
        </Switch>
    );
  }
}
