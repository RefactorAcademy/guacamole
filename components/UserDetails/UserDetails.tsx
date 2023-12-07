import React from 'react'
import Loader from '../Loader'

import './styles.css'

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isUpdateClicked: false,
      traklabUserInfo: {},
      labsData: [],
      isLoading: true,
      isChangePasswordClicked: false,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePasswordUpdateSubmit = this.handlePasswordUpdateSubmit.bind(this)
  }

  componentDidMount() {
    this.fetchMyInfo()
  }

  handleUserUpdate = () => {
    this.setState({
      isUpdateClicked: true,
    })
  }

  handlePasswordUpdateClick = () => {
    this.setState({
      isChangePasswordClicked: true,
    })
  }

  fetchMyInfo = () => {
    fetch('https://accounts.traklabs.io/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        // console.log(data)
        this.setState({
          traklabUserInfo: data,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          email: data.email,
        })
        this.fetchMyLabsInfo()
      })
  }

  fetchMyLabsInfo = () => {
    fetch('https://accounts.traklabs.io/fetchAllSubscriptions', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        // console.log(data)
        this.setState({ labsData: data, isLoading: false })
      })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleUpdateSubmit = e => {
    e.preventDefault()
    let userId = this.state.traklabUserInfo.userId
    fetch(`https://accounts.traklabs.io/user/update/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        mobileNo: this.state.mobileNo,
      }),
    }).then(res => {
      window.location.reload()
    })
  }

  handlePasswordUpdateSubmit = e => {
    e.preventDefault()
    let userId = this.state.traklabUserInfo.userId
    fetch(`https://accounts.traklabs.io/user/updatePassword/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
      body: JSON.stringify({
        password: this.state.updatedPassword,
      }),
    }).then(res => {
      window.location.reload()
    })
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <div>
            {!this.state.isUpdateClicked &&
              !this.state.isChangePasswordClicked && (
                <div className="card-container">
                  {/* <span className="pro">PRO</span> */}
                  <img
                    className="round"
                    src="https://i.ibb.co/2MVjcts/user-2.png"
                    alt="user"
                  />
                  {/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/ZVcjW0Q/user-1.png" alt="user-1" border="0"></a> */}
                  {/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/2MVjcts/user-2.png" alt="user-2" border="0"></a> */}
                  <h3>
                    {this.state.traklabUserInfo.firstName +
                      ' ' +
                      this.state.traklabUserInfo.lastName}
                  </h3>
                  <h6>{this.state.traklabUserInfo.country}</h6>
                  {/* <p>User interface designer and <br/> front-end developer</p> */}

                  <div className="user-buttons">
                    <div className="buttons">
                      <button
                        className="primary"
                        onClick={this.handleUserUpdate}
                      >
                        Update
                      </button>
                    </div>
                    <div className="buttons">
                      <button
                        className="primary ghost"
                        onClick={this.handlePasswordUpdateClick}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>

                  {/* <div className="skills">
                    <h6>My labs</h6>
                    <ul>
                      <li>ML LAB</li>
                      <li>BIG DATA</li>
                      <li>HYPERLEDGER</li>
                    </ul>
                  </div> */}
                </div>
              )}
            {this.state.isUpdateClicked && (
              <div className="card-container">
                {/* <span className="pro">PRO</span> */}
                <img
                  className="round"
                  src="https://i.ibb.co/2MVjcts/user-2.png"
                  alt="user"
                />
                <h3>
                  {this.state.traklabUserInfo.firstName +
                    '  ' +
                    this.state.traklabUserInfo.lastName}
                </h3>
                <div style={{ margin: '16px', marginTop: '32px' }}>
                  <form onSubmit={this.handleUpdateSubmit}>
                    <div className="input-container">
                      <input
                        type="mail"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        required
                      />
                      <label>First Name</label>
                    </div>
                    <div className="input-container">
                      <input
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        required
                      />
                      <label>Last Name</label>
                    </div>

                    <div className="input-container">
                      <input
                        type="mail"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required
                      />
                      <label>Email</label>
                    </div>
                    <div className="input-container">
                      <input
                        type="text"
                        name="mobileNo"
                        value={this.state.mobileNo}
                        onChange={this.handleInputChange}
                        required
                      />
                      <label>Phone number</label>
                    </div>

                    <div className="buttons">
                      <button className="primary ghost" type="submit">
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {this.state.isChangePasswordClicked && (
              <div className="card-container">
                {/* <span className="pro">PRO</span> */}
                <img
                  className="round"
                  src="https://i.ibb.co/2MVjcts/user-2.png"
                  alt="user"
                />
                <h3>
                  {this.state.traklabUserInfo.firstName +
                    '  ' +
                    this.state.traklabUserInfo.lastName}
                </h3>
                <div style={{ margin: '16px', marginTop: '32px' }}>
                  <form onSubmit={this.handlePasswordUpdateSubmit}>
                    <div className="input-container">
                      <input
                        type="text"
                        name="updatedPassword"
                        value={this.state.updatedPassword}
                        onChange={this.handleInputChange}
                        required
                      />
                      <label>New Password</label>
                    </div>

                    <button className="primary ghost" type="submit">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
