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
  experience: PropTypes.object.isRequired,
};

const ExperienceModal = ({show, experience, onClose}) => {
  if (!show || _.isEmpty(experience)) {
    return null;
  }
  return (
    <Modal size={"lg"} show={show} onHide={onClose} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Experience Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Table striped borderless hover>
            <tbody>
              <tr>
                <td>Company</td>
                <td>{experience.company}</td>
              </tr>
              <tr>
                <td>Position</td>
                <td>{experience.position}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{experience.address}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{experience.description}</td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td>{experience.startDate.format('MMMM, DD YYYY')}</td>
              </tr>
              <tr>
                <td>End Date</td>
                <td>{experience.endDate.format('MMMM, DD YYYY')}</td>
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

ExperienceModal.propTypes = propTypes;
export default ExperienceModal;
