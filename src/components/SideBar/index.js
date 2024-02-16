import {Component} from 'react'
import Profile from './Profile'
import './index.css'

class index extends Component {
  render() {
    const salaryRange = [
      {label: '10LPA', salaryRangeId: '1000000'},
      {label: '20LPA', salaryRangeId: '2000000'},
      {label: '30LPA', salaryRangeId: '3000000'},
      {label: '40LPA', salaryRangeId: '4000000'},
    ]
    const employeementType = [
      {label: 'Full Time', employeementTypeId: 'FULLTIME'},
      {label: 'Part Time', employeementTypeId: 'PARTTIME'},
      {label: 'Freelance', employeementTypeId: 'FREELANCE'},
      {label: 'Internship', employeementTypeId: 'INTERNSHIP'},
    ]
    const {handleEmployeementType, salaryRangeHandler} = this.props
    return (
      <div className="sidebar-container">
        <Profile />
        <div className="employeement-type-container">
          <h2>Type of Employeement</h2>
          <ul className="employeement-type-list">
            {employeementType.map(item => (
              <li className="list-item">
                <input
                  type="checkbox"
                  id={item.employeementTypeId}
                  name="employeementType"
                  value={item.employeementTypeId}
                  onChange={e => handleEmployeementType(e.target.value)}
                />
                <label htmlFor={item.employeementTypeId}>{item.label}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="salary-range-container">
          <h2>Salary Range</h2>
          <ul className="salary-range-list">
            {salaryRange.map(item => (
              <li className="list-item">
                <input
                  type="radio"
                  id={item.label}
                  name="salaryRange"
                  value={item.salaryRangeId}
                  onChange={e => salaryRangeHandler(e.target.value)}
                />
                <label htmlFor={item.label}>{item.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default index
