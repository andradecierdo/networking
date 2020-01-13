import React from 'react'
import PropTypes from 'prop-types'

import Navigation from '../common/navigation/index'
import Footer from '../common/footer/index'

const displayName = 'Public Layout'
const propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
}

function PublicLayout({ children, history }) {
  return (
     <div>
      <Navigation history={history}/>
      <main style={{ minHeight: 'calc(100vh - 112px)', backgroundColor: '#eeeeee'}}>
        { children }
      </main>
      <Footer/>
    </div>
  )
}

PublicLayout.dispatch = displayName
PublicLayout.propTypes = propTypes

export default PublicLayout
