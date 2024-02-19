import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseCard extends Component {
  state = {courseItem: [], apiStatus: apiConstants}

  componentDidMount() {
    this.getCourseItem()
  }

  getCourseItem = async () => {
    this.setState({apiStatus: apiConstants.initial})

    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = {
        description: data.course_details.description,
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }
      this.setState({courseItem: updateData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderCourseItem = () => {
    const {courseItem} = this.state
    const {description, name, imageUrl} = courseItem
    return (
      <div className="course-item">
        <img className="img" src={imageUrl} alt={name} />
        <div>
          <h1 className="item-head">{name}</h1>
          <p className="item-para">{description}</p>
        </div>
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>

      <button type="button" onClick={this.getCourseItem}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  finalRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderCourseItem()
      case apiConstants.in_progress:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="course-container">{this.finalRender()}</div>
      </>
    )
  }
}

export default CourseCard
