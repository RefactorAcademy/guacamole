import * as React from 'react'
import { withRouter } from 'next/router'
import { CssBaseline } from '@material-ui/core'
import HeaderBar from '../../components/HeaderBar'
import Sidebar from '../../components/Sidebar'

class MenuStructure extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLoaded: false,
      isSidebarOpen: true,
      isNonBlockchain: false,
    }
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
    this.setInitialSideBarState = this.setInitialSideBarState.bind(this)
  }

  componentDidMount() {
    let isNonBlockchain = localStorage.getItem('nonBlockchain') || false
    let isSidebarOpen =
      localStorage.getItem('isSidebarOpen') === null
        ? this.setInitialSideBarState()
        : JSON.parse(localStorage.getItem('isSidebarOpen'))
    this.setState({
      isNonBlockchain: isNonBlockchain,
      hasLoaded: true,
      isSidebarOpen: isSidebarOpen,
    })
  }

  setInitialSideBarState() {
    localStorage.setItem('isSidebarOpen', this.state.isSidebarOpen)
    return this.state.isSidebarOpen
  }

  handleSidebarToggle = () => {
    const oldVal = JSON.parse(localStorage.getItem('isSidebarOpen'))
    localStorage.setItem('isSidebarOpen', !oldVal)
    this.setState({
      isSidebarOpen: !oldVal,
    })
  }

  render() {
    let { hasLoaded, isSidebarOpen, isNonBlockchain } = this.state
    let { children, router, reloadFn, isLoading } = this.props
    let currPath = router.pathname
    let isCourses = currPath === '/courses'
    let isModule = currPath === '/module' || currPath === '/comprehensive'

    return (
      <div className={'main-container'}>
        {hasLoaded && (
          <React.Fragment>
            <CssBaseline />
            <HeaderBar
              isSidebarOpen={isSidebarOpen}
              handleSidebarToggle={this.handleSidebarToggle}
            />
            <Sidebar
              hasLoaded={hasLoaded}
              isNonBlockchain={isNonBlockchain}
              isSidebarOpen={isSidebarOpen}
              reloadFn={reloadFn}
            />
            <main
              className={`main-content ${isCourses ? 'main-full-height' : ''} ${
                isModule ? 'fixed-body' : ''
              } ${isModule && !isSidebarOpen ? 'main-full-width' : ''}`}
            >
              {(!isModule && <div className={'content-spacer'} />) || null}
              {(isModule && (
                <div
                  className={`content-page-layout ${
                    isLoading ? 'extend-width' : ''
                  } ${
                    !isSidebarOpen ? 'content-page-max' : 'content-page-normal'
                  }`}
                >
                  {children}
                </div>
              )) || (
                <div
                  className={`content-page-layout ${
                    isLoading ? 'extend-width' : ''
                  }`}
                >
                  {children}
                </div>
              )}
              {/*<div*/}
              {/*className={`content-page-layout ${isLoading ? 'extend-width' : ''}`}*/}
              {/*>*/}
              {/*{children}*/}
              {/*</div>*/}
            </main>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(MenuStructure)
