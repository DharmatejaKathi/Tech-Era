import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseList from '../CourseList'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseCard extends Component {
  state = {courseList: [], apiStatus: apiConstants.initial}

  componentDidMount = () => {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({apiStatus: apiConstants.initial})

    const url = `https://apis.ccbp.in/te/courses`
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updateData = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      console.log(updateData)
      this.setState({courseList: updateData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderList = () => {
    const {courseList} = this.state
    return (
      <ul className="ul">
        {courseList.map(each => (
          <CourseList listDetails={each} key={each.id} />
        ))}
      </ul>
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

      <button type="button" onClick={this.getCourseList}>
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
        return this.renderList()
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
        <h1>Courses</h1>
        <div className="container">{this.finalRender()}</div>
      </>
    )
  }
}

export default CourseCard
