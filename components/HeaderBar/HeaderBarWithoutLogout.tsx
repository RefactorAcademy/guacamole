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

    localStorage.removeItem('tkz')
    localStorage.removeItem('userName')
    localStorage.removeItem('isSidebarOpen')
    localStorage.removeItem('hasAITool')
    localStorage.removeItem('hasBlockchain')
    localStorage.removeItem('nonBlockchain')
    localStorage.removeItem('hasIOT')
    localStorage.removeItem('hasBigData')

    Router.push('/signin')
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
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <div className={'header-logo'}>
              <img
                src="../../static/images/ti-labs-light.png"
                style={{ height: 50, verticalAlign: 'middle' }}
                onClick ={()=> {Router.push('/signin')}}
              />
            </div>
          </div>
          {/* <div
            aria-haspopup="true"
            className={'toolbar-user-icon'}
            onClick={() => this.handleLogout()}
          > */}
          {/* {(isLoggingOut && <CircularProgress size={20} />) || (
              <PowerSettingsNewRounded />
            )} */}
          {/*{(userInitial && <span>{userInitial}</span>) || (*/}
          {/*<SentimentVerySatisfied />*/}
          {/*)}*/}
          {/*<img src="https://material-ui.com/static/images/avatar/1.jpg" />*/}
          {/* </div> */}
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

export default MylabsHeaderBar
