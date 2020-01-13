import React, { Component } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

class Page extends Component {
  static displayName = "HomePage"

  render() {
    return (
      <div className="container py-5">
        <Row>
          <Col md={"12"}>
            <Row>
              <div className="mx-auto col-lg-5">
                <span className="anchor"/>
                  <div className="container text-center">
                    <h1>Networking Site</h1>
                    <p>Philippines</p>
                  </div>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Page
