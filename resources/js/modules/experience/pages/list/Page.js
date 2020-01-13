import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from 'react-bootstrap/Table';
import ExperienceRow from './components/ExperienceRow'
import ExperienceModal from '../modal'
import Pagination from './components/Pagination'
import { Link } from 'react-router-dom'
import {history} from "../../../../store/config";

import { experienceListRequest, experienceRemoveRequest } from '../../service'

class Page extends Component {
  static displayName = 'ExperiencesPage'
  static propTypes = {
    meta: PropTypes.object.isRequired,
    experiences: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      currentExperience: {},
    };

    this.handleRemove = this.handleRemove.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleView = this.handleView.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  
  componentWillMount() {
    const { dispatch } = this.props
  
    dispatch(experienceListRequest({}))
  }

  handleView = (experience) => {
    this.setState({
      showModal: true,
      currentExperience: experience,
    });
  };

  handleEdit = (id) => {
   this.props.history.push(`/experiences/${id}/edit`)
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      currentExperience: {},
    });
  }
  
  pageChange(pageNumber) {
    this.props.dispatch(experienceListRequest({pageNumber}))
  }
  
  handleRemove(id) {
    this.props.dispatch(experienceRemoveRequest(id))
  }
  
  renderExperiences() {
    return this.props.experiences.map((experience, index) => {
      return (
        <ExperienceRow
          key={index}
          experience={experience}
          index={index}
          handleEdit={this.handleEdit}
          handleRemove={this.handleRemove}
          handleView={this.handleView}
        />
      )
    })
  }
  //     <main className="col-sm-12 ml-sm-auto col-md-10 pt-3" role="main">
  render() {
    const {showModal, currentExperience} = this.state;
    return (
      <main className="col-sm-9 ml-sm-auto ml-lg-auto col-md-9 pt-3" role="main">
        <h1>Experiences</h1>
        <section className="row">
          <div className="col-12 col-md-9 col-sm-12">
            <Table striped className="table-responsive" responsive={true}>
              <thead className="thead-inverse">
              <tr>
                <th>#</th>
                <th>Position</th>
                <th>Company</th>
                <th>Address</th>
                <th>
                  <Link to='/experiences/create' className="btn btn-success">Add</Link>
                </th>
              </tr>
              </thead>
              <tbody>
              {this.renderExperiences()}
              </tbody>
            </Table>
            <Pagination meta={this.props.meta} onChange={this.pageChange}/>
            <ExperienceModal
              show={showModal}
              experience={currentExperience}
              onClose={this.handleCloseModal}
            />
          </div>
        </section>
      </main>
    )
  }
}

export default Page
