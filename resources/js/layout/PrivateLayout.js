import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Navigation from '../common/navigation'
import Footer from '../common/footer'

class PrivateLayout extends Component {
  static displayName = 'Private Layout';
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    user: PropTypes.object,
    history: PropTypes.object,
  };

  componentDidUpdate() {
    const { history, location } = this.props;
    let currentPathArray = location.pathname.split('/');
    let isAdminPath = currentPathArray[1] === 'admin';

    if (isAdminPath) {
      history.push('/');
    }
  }

  render() {
    const { children, location } = this.props;
    const currentPathArray = location.pathname.split('/');
    const editor = (
      currentPathArray[1] === 'movie' &&
      currentPathArray[2] === 'editor');
    const narrationEditor = (
      currentPathArray[1] === 'movie' &&
      currentPathArray[2] === 'narration');

    return <div id="body" className={(editor || narrationEditor) ? 'body__editor' : ''}>
      <Navigation/>
      <main>
        {children}
      </main>
      {!editor && !narrationEditor && <Footer/>}
    </div>
  }
}

export default PrivateLayout
