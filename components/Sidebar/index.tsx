import * as React from 'react'
import { withRouter } from 'next/router'
import Router from 'next/router'
import Link from 'next/link'
import { MENU_OPTIONS } from '../../constants'
import Loader from '../Loader'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

const checkMenuIsActive = (possiblePathnames, currentPath) => {
  return !!possiblePathnames.find(item => item === currentPath)
}

const Sidebar: React.FunctionComponent = ({
  router,
  isSidebarOpen,
  reloadFn,
  isNonBlockchain,
  hasLoaded,
}) => (
  <Drawer
    variant="permanent"
    anchor="left"
    classes={{
      root: `cust-drawer ${isSidebarOpen ? 'menu-open' : 'menu-close'}`,
      paper: `cust-drawer-child ${isSidebarOpen ? 'menu-open' : 'menu-close'}`,
    }}
  >
    <div className={'logo-section'}>
      <img src="../../static/images/ti-labs-light.png" 
        style={{ height: 90 }}
        onClick={()=> Router.push('/error','/mylabs')}  
      />
    </div>
    <Divider />
    {(hasLoaded && (
      <List classes={{ root: 'cust-list' }}>
        {MENU_OPTIONS.map(
          menuItem =>
            ((!isNonBlockchain ||
              (isNonBlockchain && !menuItem.hideWithNonBlockchain)) && (
              <React.Fragment key={menuItem.pathname}>
                <div
                  onClick={
                    reloadFn &&
                    checkMenuIsActive(menuItem.routes, router.pathname)
                      ? reloadFn
                      : () => function() {}
                  }
                >
                  <Link
                    href={{
                      pathname: menuItem.pathname,
                      query: {},
                    }}
                  >
                    <ListItem
                      button
                      key={menuItem.listName}
                      classes={{
                        root: `cust-list-item ${
                          checkMenuIsActive(menuItem.routes, router.pathname)
                            ? 'menu-active'
                            : ''
                        }`,
                      }}
                    >
                      <ListItemIcon classes={{ root: 'cust-list-item-icon' }}>
                        {menuItem.icon}
                      </ListItemIcon>
                      <ListItemText className={'cust-list-item-text'}>
                        {menuItem.name}
                      </ListItemText>
                    </ListItem>
                  </Link>
                </div>
                {menuItem.subMenus &&
                  checkMenuIsActive(menuItem.routes, router.pathname) &&
                  menuItem.subMenus.map(subMenuItem => (
                    <div
                      onClick={
                        reloadFn &&
                        checkMenuIsActive(menuItem.routes, router.pathname)
                          ? reloadFn
                          : () => function() {}
                      }
                      key={subMenuItem.pathname}
                    >
                      <Link
                        href={{
                          pathname: subMenuItem.pathname,
                          query: {},
                        }}
                        as={subMenuItem.pathAlias}
                      >
                        <ListItem
                          button
                          key={subMenuItem.listName}
                          classes={{
                            root: `cust-list-item cust-list-item-sub ${
                              checkMenuIsActive(
                                subMenuItem.routes,
                                router.pathname
                              )
                                ? 'sub-menu-active'
                                : ''
                            }`,
                          }}
                        >
                          <ListItemIcon
                            classes={{ root: 'cust-list-item-icon' }}
                          >
                            {subMenuItem.icon}
                          </ListItemIcon>
                          <ListItemText className={'cust-list-item-text'}>
                            {subMenuItem.name}
                          </ListItemText>
                        </ListItem>
                      </Link>
                    </div>
                  ))}
              </React.Fragment>
            )) ||
            null
        )}
      </List>
    )) || <Loader />}
    <div className={'drawer-bottom-text'}>
      <img src="../../static/images/powered-aws-alt-light.png" />
    </div>
  </Drawer>
)

export default withRouter(Sidebar)
