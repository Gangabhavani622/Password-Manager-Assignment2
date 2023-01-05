import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import PasswordItem from './components/PasswordItem/PasswordItem'
import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isShowPassword: false,
    passwordsList: [],
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  addPasswords = event => {
    const {website, username, password} = this.state
    event.preventDefault()

    const newPasswordItem = {
      id: uuidV4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordItem],
      website: '',
      username: '',
      password: '',
    }))
  }

  onDeletePasswordItem = id => {
    const {passwordsList} = this.state
    const newPasswordList = passwordsList.filter(each => each.id !== id)

    this.setState({passwordsList: newPasswordList})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onFilterSearchInput = search => {
    const {passwordsList} = this.state
    const filteredSearchList = passwordsList.filter(
      eachItem => eachItem.website === search,
    )

    return filteredSearchList
  }

  render() {
    const {passwordsList, isShowPassword, searchInput} = this.state
    const count = passwordsList.length
    const isPasswordPresent =
      passwordsList.length === 0 ? (
        <div className="display-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
            alt="no passwords"
            className="no-passwords-img"
          />
          <p className="para1">No Passwords</p>
        </div>
      ) : (
        <ul className="display-section1">
          {passwordsList.map(eachItem => (
            <PasswordItem
              key={eachItem.id}
              passwordItem={eachItem}
              showPasswordStatus={isShowPassword}
              onDeletePasswordItem={this.onDeletePasswordItem}
            />
          ))}
        </ul>
      )

    return (
      <div className="app-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="logo"
        />
        <div className="password-cont">
          <form className="card1">
            <h1 className="heading">Add New Password</h1>
            <div className="website-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                alt="website"
                className="container-logo"
              />
              <input
                className="container-input"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="username-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="container-logo"
              />
              <input
                className="container-input"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="password-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="container-logo"
              />
              <input
                type="password"
                className="container-input"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button
              type="submit"
              className="button"
              onClick={this.addPasswords}
            >
              Add
            </button>
          </form>
          <div className="card2">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager"
            />
          </div>
        </div>

        <div className="container2">
          <div className="password-display-section">
            <div className="password-heading-section">
              <h1 className="password-heading">Your Passwords</h1>
              <p className="passwords-count">{count}</p>
            </div>
            <div className="search-section">
              <img
                className="search-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <p className="line"> </p>
          <div className="checkbox-section">
            <input
              id="checkbox"
              type="checkbox"
              onClick={this.onCheckedPassword}
              className="checkbox"
            />
            <label className="label" htmlFor="checkbox">
              Show Passwords
            </label>
          </div>
          {isPasswordPresent}
        </div>
      </div>
    )
  }
}

export default App
