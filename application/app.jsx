import React from 'react';

import Header from './components/header';
import Content from './components/content';
import GifView from './components/gif-view';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <section id="application">
            <section id="applicationMain">
                <Header />
                <Content />
                <GifView />
            </section>
        </section>
    );
  }
}
