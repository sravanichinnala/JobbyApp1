import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

const index = props => {
  const {jobDetails} = props
  const {
    company_logo_url: companyLogoUrl,
    employment_type: employmentType,
    id,
    job_description: jobDescription,
    location,
    package_per_annum: packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
      <div className="job-item-card-container">
        <div style={{display: 'flex'}}>
          <img src={companyLogoUrl} alt="company logo" />
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
          <h4>Description</h4>
          <p>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default index
