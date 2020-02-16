import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import {generateCodes} from '../service';

class RegistrationCodeModal extends Component {
  static displayName = 'RegistrationCodeModal'
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = {
      show: props.show,
      passcode: null,
      securityCode: null,
      generated: false,
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleGenerateCode = this.handleGenerateCode.bind(this);
  }

  handleGenerateCode = () => {
    this.props.dispatch(generateCodes()).then(data => {
      this.setState({
        passcode: data.passcode,
        securityCode: data.securityCode,
        generated: true,
      });
    });
  }

  handleClose = () => {
    this.setState({show: false});
    this.props.onClose();
  }

  render() {
    const {passcode, securityCode, generated, show} = this.state;
    console.log(this.state);
    return (
      <Modal size={"lg"} show={show} onHide={this.handleClose} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Registration Codes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign: 'center'}}>
          {generated ?
          <Container>
            <Table striped borderless hover>
              <tbody>
              <tr>
                <td>Passcode</td>
                <td>{passcode}</td>
              </tr>
              <tr>
                <td>Security Code</td>
                <td>{securityCode}</td>
              </tr>
              </tbody>
          </Table>
          </Container>
            : <Button variant="primary" onClick={this.handleGenerateCode}>Generate Code</Button>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RegistrationCodeModal;
