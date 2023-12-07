import * as React from 'react'
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import {
  SentimentVerySatisfied,
  PowerSettingsNewRounded,
} from '@material-ui/icons'
import Router from 'next/router'
import MenuIcon from '@material-ui/icons/Menu'
import { Select } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

class MylabsHeaderBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorElem: null,
      userInitial: '',
      isLoggingOut: false,
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem('userName')) {
      this.setUserInitial(localStorage.getItem('userName'))
    }
  }

  setUserInitial = userName => {
    this.setState({ userInitial: userName.charAt(0) })
  }

  handleLogout = () => {
    this.setState({ isLoggingOut: true })

    // localStorage.removeItem('tkz')
    // localStorage.removeItem('userName')
    // localStorage.removeItem('isSidebarOpen')
    // localStorage.removeItem('hasAITool')
    // localStorage.removeItem('hasBlockchain')
    // localStorage.removeItem('nonBlockchain')
    // localStorage.removeItem('hasIOT')
    // localStorage.removeItem('hasBigData')

    localStorage.clear();

    Router.push('/signin')
  }
  handleMyAccount = () => {
    Router.push('/error', '/profile')
    // Router.push('/profile')
  }
  handleIconClick = () => {
    // window.location = 'http://52.252.106.68:3000/mylabs'
    Router.push('/error', '/mylabs')
  }

  render() {
    let { isLoggingOut } = this.state
    let { handleSidebarToggle, isSidebarOpen } = this.props

    return (
      <AppBar
        position={'fixed'}
        classes={{
          root: `cust-appbar ${isSidebarOpen ? 'header-normal' : 'header-max'}`,
        }}
      >
        <Toolbar classes={{ root: 'cust-toolbar' }}>
          <div>
            <IconButton
              color="inherit"
              aria-label="Open Menu"
              onClick={() => handleSidebarToggle()}
              edge="start"
            />
            <div className={'header-logo'}>
              <img
                onClick={() => this.handleIconClick()}
                src="../../static/images/ti-labs-light.png"
                style={{ height: 50, verticalAlign: 'middle' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
              aria-haspopup="true"
              className={'toolbar-user-icon'}
              onClick={() => this.handleMyAccount()}
              style={{ marginRight: '12px' }}
            >
              <AccountCircleIcon />
            </div>
            <div
              aria-haspopup="true"
              className={'toolbar-user-icon'}
              onClick={() => this.handleLogout()}
            >
              {(isLoggingOut && <CircularProgress size={20} />) || (
                <PowerSettingsNewRounded />
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default MylabsHeaderBar
