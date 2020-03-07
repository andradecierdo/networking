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
    const { children } = this.props;

    return <div id="body">
      <Navigation {...this.props}/>
      <main style={{minHeight: 'calc(100vh - 112px)'}}>
        {children}
      </main>
      <Footer/>
    </div>
  }
}

export default PrivateLayout
