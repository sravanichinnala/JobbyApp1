import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class index extends Component {
  state = {
    profileData: {},
    status: true,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const urlPath = 'https://apis.ccbp.in/profile'
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
        profileData: jsonData.profile_details,
      })
    } else {
      this.setState({status: false})
    }
  }

  render() {
    const {status, profileData} = this.state
    const {
      name,
      profile_image_url: profileImage,
      short_bio: shortBio,
    } = profileData
    return (
      <>
        {status ? (
          <div className="profile-container">
            <img src={profileImage} alt="profile" />
            <h1 className="heading">{name}</h1>
            <p className="paragraph">{shortBio}</p>
            <hr className="horigontal-line" />
          </div>
        ) : (
          <div>
            <button
              type="button"
              className="button"
              onClick={this.getUserProfile}
            >
              Retry
            </button>
            <hr />
          </div>
        )}
      </>
    )
  }
}
export default index
