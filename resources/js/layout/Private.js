import React from 'react'
import PropTypes from 'prop-types'

import Navigation from '../common/navigation/index'
import Footer from '../common/footer/index'

const displayName = 'Private Layout'
const propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
}

function PrivateLayout({ children, history }) {
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

PrivateLayout.dispatch = displayName
PrivateLayout.propTypes = propTypes

export default PrivateLayout
