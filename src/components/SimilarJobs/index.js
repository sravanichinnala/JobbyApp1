import './index.css'
import {Link} from 'react-router-dom'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    company_logo_url: companyLogoUrl,
    employeement_type: employeementType,
    title,
    rating,
    job_description: jobDescription,
    location,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
      <li
        className="similar-job-item"
        style={{
          width: '25%',
          background: 'black',
          color: 'white',
          border: '1px solid white',
          margin: '10px',
        }}
      >
        <img
          src={companyLogoUrl}
          className="similar-job-image"
          alt="similar job company logo"
          width="50px"
          height="50px"
        />
        <h1 className="similar-job-title">{title}</h1>
        <div className="similar-job-rating-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-image"
          />
          <p className="similar-job-rating">{rating}</p>
        </div>
        <h1 className="similar-job-description-heading">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
        <p className="location">{location}</p>
        <p className="employement-type">{employeementType}</p>
      </li>
    </Link>
  )
}

export default SimilarJobs
