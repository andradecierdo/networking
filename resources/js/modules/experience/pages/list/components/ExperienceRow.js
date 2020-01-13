import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';

const displayName = 'ExperienceRow'
const propTypes = {
  index: PropTypes.number.isRequired,
  experience: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleView: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
}

const ExperienceRow = ({ index, experience, handleEdit, handleRemove, handleView}) => {
  return (
    <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{experience.position}</td>
      <td>{experience.company}</td>
      <td>{experience.address}</td>
      <td>
        <div className="btn-group" role="group" aria-label="Actions">
          <Button variant="primary" onClick={() => handleEdit(experience.id)}>Edit</Button>
          <Button variant="danger" onClick={() => handleRemove(experience.id)}>Delete</Button>
          <Button variant="info" onClick={() => handleView(experience)}>View</Button>
        </div>
      </td>
    </tr>
  )
}

ExperienceRow.displayName = displayName
ExperienceRow.propTypes = propTypes

export default ExperienceRow
