import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <section id="header">
             <Link to="/"><span>giphy</span></Link>
             <Link to="/my-collection" className="my-collection">my collection</Link>
        </section>
    );
  }
}
