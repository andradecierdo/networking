import React, { Component } from "react"

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import CodeGeneratorModal from '../../../registration-code/modal';

class Page extends Component {
  static displayName = "AdminHomePage"

  constructor(props) {
    super(props)

    this.state = {
      openCodeGenerator: false,
    }

    this.handleOpenCodeGenerator = this.handleOpenCodeGenerator.bind(this)
    this.handleCloseCodeGenerator = this.handleCloseCodeGenerator.bind(this)
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/admin/login');
    }
  }

  handleOpenCodeGenerator = () => {
    this.setState({openCodeGenerator: true});
  }

  handleCloseCodeGenerator = () => {
    this.setState({openCodeGenerator: false});
  }

  render() {
    const {openCodeGenerator} = this.state;
    const {dispatch} = this.props;
    return (
      <div className="container py-5">
        <Row>
          <Col md={"12"}>
            <Row>
              <div className="mx-auto col-lg-5">
                <span className="anchor"/>
                  <div className="container text-center">
                    <h1>Admin Site</h1>
                    <p>Dashboard</p>
                    <button onClick={this.handleOpenCodeGenerator}>Open Code Generator</button>
                  </div>
              </div>
            </Row>
          </Col>
        </Row>
        {openCodeGenerator &&
          <CodeGeneratorModal dispatch={dispatch} show={openCodeGenerator} onClose={this.handleCloseCodeGenerator} />
        }
      </div>
    )
  }
}

export default Page
