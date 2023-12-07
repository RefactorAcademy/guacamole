import * as React from 'react'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import MenuStructure from '../layouts/MenuStructure'
import Router from 'next/router'
import {
  Button,
  CircularProgress,
  Card,
  CardContent,
  Snackbar,
  IconButton,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import ResponseError from '../components/ResponseError'
import { callAPI, checkInitialResponse } from '../utilities'

class ProjectsComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isError: false,
      showError: false,
      errorMsg: '',
    }
  }

  componentDidMount() {
    if (!localStorage.getItem('tkz')) {
      Router.push('/signin')
    } else if (localStorage.getItem('nonBlockchain')) {
      Router.push('/mylabs')
    }
  }

  // checkResponse = response => {
  //   let res = checkInitialResponse(response)

  //   if (res.error) {
  //     this.setState({
  //       isLoading: false,
  //       isError: !!res.error,
  //       showError: !!res.error,
  //       errorMsg: res.status,
  //     })
  //   }

  //   return (res.error && res.error) || res
  // }

  render() {
    let { isLoading, isError, showError, errorMsg } = this.state

    let data = [
      {
        id: 1,
        title: 'Setting up your Machine',
        desc:
          'Install and understand Docker Container, Node.js, Java and Hyperledger Fabric, Perform all the necessary installation on the local machine or test it on our cloud labs.',
        action: '',
      },
      {
        id: 2,
        title: 'Setting up Ethereum Development Setup on your Machine',
        desc:
          'Step by Step, add Ethereum blockchain development environment to your local machine, or try it hands on your cloudlabs',
        action: 'https://www.youtube.com/watch?v=0X_VpOZOL48',
      },
      {
        id: 3,
        title: 'Deploy your first smart contract',
        desc:
          'Create your own smart contract and deploy it on the ethereum test network',
        action: '',
      },
      {
        id: 4,
        title: 'Setting up Hyperledger Fabric Setup on your Machine',
        desc:
          'Step by Step, add Hyperleder Fabric to your local machine, or try it hands on your cloudlabs',
        action: 'https://www.youtube.com/watch?v=0X_VpOZOL48',
      },
      {
        id: 5,
        title:
          'Create and deploy you blockchain network using hyperledger Java Sdk',
        desc:
          'Create and deploy you blockchain network using hyperledger SDK for Java. Set up and initialize the channel, install and instantiate chaincode, and perform invoke and query on your blockchain network.',
        action:
          'https://developer.ibm.com/patterns/create-and-deploy-blockchain-network-using-fabric-sdk-java',
      },
      {
        id: 6,
        title: 'Complete your first transaction on blockchain',
        desc:
          'Interact with your blockchain network. Execute a transaction and request against your blockchain network by creating an App to test the network and its rules',
        action:
          'https://developer.ibm.com/patterns/interacting-with-a-blockchain-network',
      },
    ]

    return (
      <Layout title={'Projects'}>
        <MenuStructure>
          <div className={'content-page-layout'}>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={showError}
              autoHideDuration={5000}
              onClose={() => this.setState({ showError: !showError })}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={
                <span id="message-id">
                  Error:{' '}
                  {(errorMsg && errorMsg) ||
                    'An error occurred. Please try again.'}
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  onClick={() => this.setState({ showError: !showError })}
                >
                  <Close />
                </IconButton>,
              ]}
            />
            <div className={'page-header'} />
            {(isLoading && <Loader />) || null}
            {(isError && (
              <ResponseError backFn={() => this.props.url.back()} />
            )) ||
              null}
            {!isError && (
              <div
                className={`page-content projects-content ${
                  !isLoading ? 'content-show' : 'content-hide'
                }`}
              >
                <div className={'page-welcome'}>
                  <span>Projects</span>
                </div>
                <div className={'page-caption'}>
                  <span>Start learning and upload your work here</span>
                </div>
                <div className={'page-body'}>
                  <div className={'projects-list'}>
                    {data.map((item, idx) => (
                      <div className={'item-container'} key={item.id}>
                        <Card classes={{ root: 'item-card' }}>
                          <CardContent classes={{ root: 'item-content' }}>
                            <div className={'content-heading'}>
                              <span>{item.title}</span>
                            </div>
                            <div className={'content-details'}>
                              <div className={'proj-details proj-desc'}>
                                <span>{item.desc}</span>
                              </div>
                              <div className={'proj-details proj-action'}>
                                <span>
                                  <b>Know More: </b>
                                  <a href={item.action}>Click here</a>
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </MenuStructure>
      </Layout>
    )
  }
}

export default ProjectsComponent
