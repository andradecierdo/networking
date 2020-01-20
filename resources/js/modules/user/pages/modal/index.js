import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const UserModal = ({show, user, onClose}) => {
  if (!show || _.isEmpty(user)) {
    return null;
  }
  return (
    <Modal size={"lg"} show={show} onHide={onClose} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Table striped borderless hover>
            <tbody>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>First Name</td>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <td>Middle Name</td>
              <td>{user.middleName}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{user.address}</td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{user.phoneNumber}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

UserModal.propTypes = propTypes;
export default UserModal;
