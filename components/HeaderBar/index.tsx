import * as React from 'react'
import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import {
  SentimentVerySatisfied,
  PowerSettingsNewRounded,
} from '@material-ui/icons'
import Router from 'next/router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'

class HeaderBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorElem: null,
      userInitial: '',
      isLoggingOut: false,
      openLabMenu: false,
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

    localStorage.clear();

    // localStorage.removeItem('tkz')
    // localStorage.removeItem('userName')
    // localStorage.removeItem('isSidebarOpen')
    // localStorage.removeItem('hasAITool')
    // localStorage.removeItem('hasBlockchain')
    // localStorage.removeItem('nonBlockchain')
    // localStorage.removeItem('hasIOT')
    // localStorage.removeItem('hasBigData')

    Router.push('/signin')
  }

  handleMyAccount = () => {
    // window.location = 'Router.push('/error','/profile')'
    Router.push('/error', '/profile')
  }

  prepareLabMenu = () => {
    return (
      <div style={{ alignSelf: 'center' }}>
        <Button
          aria-controls="simple-menu"
          style={{ color: 'white' }}
          aria-haspopup="true"
          onClick={this.openLabMenu.bind(this)}
        >
          Your Labs
        </Button>
        <Menu
          id="simple-menu"
          // anchorEl={anchorEl}

          // style={{position: 'absolute', background: 'green'}}
          // keepMounted
          // style={{position: 'fixed', top:0, left: 0}}
          open={this.state.openLabMenu}
          onClose={this.handleLabMenuClose.bind(this)}
        >
          <MenuItem onClick={this.handleLabMenuClose.bind(this)}>
            Profile
          </MenuItem>
          <MenuItem onClick={this.handleLabMenuClose.bind(this)}>
            My account
          </MenuItem>
          <MenuItem onClick={this.handleLabMenuClose.bind(this)}>
            Logout
          </MenuItem>
        </Menu>
      </div>
    )
  }

  openLabMenu = () => {
    this.setState({
      openLabMenu: true,
    })
  }

  handleLabMenuClose = () => {
    this.setState({
      openLabMenu: false,
    })
  }

  render() {
    let { isLoggingOut } = this.state
    let { handleSidebarToggle, isSidebarOpen } = this.props
    let labMenuContent = this.prepareLabMenu()

    return (
      <AppBar
        position={'fixed'}
        classes={{
          root: `cust-appbar ${isSidebarOpen ? 'header-normal' : 'header-max'}`,
        }}
      >
        <Toolbar classes={{ root: 'cust-toolbar' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton
              color="inherit"
              aria-label="Open Menu"
              onClick={() => handleSidebarToggle()}
              edge="start"
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={() => Router.push('/error', '/mylabs')}
              edge="start"
            >
              <HomeIcon />
            </IconButton>

            {/* {labMenuContent} */}

            <div className={'header-logo'}>
              <img
                onClick={() => Router.push('/error', '/mylabs')}
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

              {/*{(userInitial && <span>{userInitial}</span>) || (*/}
              {/*<SentimentVerySatisfied />*/}
              {/*)}*/}
              {/*<img src="https://material-ui.com/static/images/avatar/1.jpg" />*/}
            </div>
            <div
              aria-haspopup="true"
              className={'toolbar-user-icon'}
              onClick={() => this.handleLogout()}
            >
              {(isLoggingOut && <CircularProgress size={20} />) || (
                <PowerSettingsNewRounded />
              )}
              {/*{(userInitial && <span>{userInitial}</span>) || (*/}
              {/*<SentimentVerySatisfied />*/}
              {/*)}*/}
              {/*<img src="https://material-ui.com/static/images/avatar/1.jpg" />*/}
            </div>
          </div>

          {/*<Menu*/}
          {/*anchorEl={anchorElem}*/}
          {/*open={Boolean(anchorElem)}*/}
          {/*onClose={() => this.setState({ anchorElem: null })}*/}
          {/*getContentAnchorEl={null}*/}
          {/*anchorOrigin={{*/}
          {/*vertical: 'bottom',*/}
          {/*horizontal: 'right',*/}
          {/*}}*/}
          {/*transformOrigin={{*/}
          {/*vertical: 'top',*/}
          {/*horizontal: 'right',*/}
          {/*}}*/}
          {/*classes={{ paper: 'toolbar-user-menu' }}*/}
          {/*>*/}
          {/*<MenuItem onClick={}>*/}
          {/*<>*/}
          {/*<span className={isLoggingOut ? 'menu-item-has-progress' : ''}>*/}
          {/*Logout*/}
          {/*</span>*/}
          {/*{(isLoggingOut && <CircularProgress size={20} />) || null}*/}
          {/*</>*/}
          {/*</MenuItem>*/}
          {/*</Menu>*/}
        </Toolbar>
      </AppBar>
    )
  }
}

export default HeaderBar
