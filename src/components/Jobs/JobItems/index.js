import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import JobItemCard from '../JobItemCard'
import './index.css'

class index extends Component {
  state = {
    searchInput: '',
  }

  searchInputHandler = e => {
    this.setState({
      searchInput: e.target.value,
    })
  }

  render() {
    const {searchInput} = this.state
    const {jobsList, getJobs} = this.props
    return (
      <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search jobs"
            value={searchInput}
            onChange={this.searchInputHandler}
            id="searchInput"
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={() => getJobs(searchInput)}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="jobs-list-container">
          {jobsList.length === 0 ? (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. Try other filters</p>
            </>
          ) : (
            jobsList.map(item => <JobItemCard jobDetails={item} />)
          )}
        </ul>
      </div>
    )
  }
}

export default index
