import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import Header from '../../Header'
import SimilarJobs from '../../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class index extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    jobDetails: {
      company_logo_url: '',
      company_website_url: '',
      employment_type: '',
      job_description: '',
      skills: [],
      life_at_company: {
        description: '',
        image_url: '',
      },
      location: '',
      package_per_annum: '',
      rating: '',
      title: '',
    },
    similarJobs: [],
    jwtToken: null,
  }

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    console.log('jwtToken')
    if (jwtToken !== undefined) {
      this.setState({jwtToken}, () => {
        const {match} = this.props
        const {params} = match
        const jobId = params.id
        console.log(params)
        this.getJobDetails(jobId)
      })
    } else {
      const {history} = this.props
      history.push('/login')
    }
  }

  getJobDetails = async id => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {jwtToken} = this.state
    const urlPath = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(urlPath, options)
    if (response.ok) {
      const jsonData = await response.json()
      console.log(jsonData)
      this.setState({
        jobDetails: jsonData.job_details,
        similarJobs: jsonData.similar_jobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails} = this.state
    const {
      company_logo_url: companyLogoUrl,
      company_website_url: companyWebsiteUrl,
      employment_type: employmentType,
      job_description: jobDescription,
      skills,
      life_at_company: lifeAtCompany,
      location,
      package_per_annum: packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {similarJobs} = this.state
    return (
      <>
        <Header />
        <div className="job-item-detail-container">
          <div style={{display: 'flex'}}>
            <img src={companyLogoUrl} alt="job details company logo" />
            <div style={{display: 'flex'}}>
              <h4>{title}</h4>
              <p>{rating}</p>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex'}}>
              <p>{location}</p>
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <span>
              <h1>Description</h1>
              <a href={companyWebsiteUrl}>Visit</a>
            </span>
            <p>{jobDescription}</p>
          </div>
          <div className="skill-container">
            <h1>Skills</h1>
            <ul style={{display: 'flex', flexWrap: 'wrap'}}>
              {skills.map(item => (
                <li style={{display: 'flex'}}>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{width: '50px', height: '50px'}}
                  />
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1>Life at Company</h1>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1>Similar Jobs</h1>
          <ul style={{display: 'flex', flexWrap: 'wrap'}}>
            {similarJobs.map(item => (
              <SimilarJobs jobDetails={item} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.renderSuccessView}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
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

export default withRouter(index)
