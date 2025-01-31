import React from 'react'
import PropTypes from 'prop-types'

import Navigation from '../common/navigation'
import Footer from '../common/footer'

const displayName = 'Public Layout';
const propTypes = {
  children: PropTypes.node.isRequired,
  isAdminRoute: PropTypes.bool,
};

function PublicLayout(props) {
  const { isAdminRoute, children } = props;

  if (isAdminRoute) {
    return <div>{children}</div>
  }

  return <div id="body">
    <Navigation {...props}/>
    <main style={{minHeight: 'calc(100vh - 112px)'}}>
      {children}
    </main>
    <Footer/>
  </div>
}

PublicLayout.dispatch = displayName;
PublicLayout.propTypes = propTypes;

export default PublicLayout
