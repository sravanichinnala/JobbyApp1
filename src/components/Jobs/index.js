import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SideBar from '../SideBar'
import Header from '../Header'
import './index.css'
import JobItems from './JobItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class index extends Component {
  state = {
    jobsList: [],
    salaryRange: '1000000',
    employeementType: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs('')
  }

  handleEmployeementType = employeementTypeId => {
    let {employeementType} = this.state
    const {searchInput} = this.state
    if (employeementType.includes(employeementTypeId)) {
      employeementType = employeementType.filter(
        id => id !== employeementTypeId,
      )
    } else {
      employeementType = [...employeementType, employeementTypeId]
    }
    this.setState({employeementType}, () => {
      this.getJobs(searchInput)
    })
  }

  salaryRangeHandler = salaryRangeId => {
    const {searchInput} = this.state
    this.setState({salaryRange: salaryRangeId}, () => {
      this.getJobs(searchInput)
    })
  }

  getJobs = async searchInput => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {salaryRange, employeementType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employeementTypesText = employeementType.join()
    const urlPath = `https://apis.ccbp.in/jobs?employment_type=${employeementTypesText}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(urlPath, options)
    if (response.ok) {
      const jsonData = await response.json()
      this.setState({
        jobsList: jsonData.jobs,
        searchInput,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <>
        <Header />
        <div className='jobs-main-container'>
          <SideBar
            handleEmployeementType={this.handleEmployeementType}
            salaryRangeHandler={this.salaryRangeHandler}
          />
          <JobItems getJobs={this.getJobs} jobsList={jobsList} />
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className='loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type='button' onClick={this.renderSuccessView}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to='/login' />
    }

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default index
