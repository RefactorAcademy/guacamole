import * as React from 'react'
import Layout from '../components/Layout'
import isomorphicUnfetch from 'isomorphic-unfetch'
import MenuStructure from '../layouts/MenuStructure'
import { Button, Card, CardContent, Tooltip } from '@material-ui/core'
import { Info } from '@material-ui/icons'
import { ENDPOINTS } from '../constants'
import { callAPI, checkInitialResponse } from '../utilities'

class InternshipsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      blogContent: [],
    }
  }

  componentDidMount() {
    callAPI(ENDPOINTS.ME, null, null)
      .then(this.checkResponse.bind(this))
      .then(() => {})
  }

  checkResponse = response => {
    let res = checkInitialResponse(response)

    if (res.error) {
      this.setState({
        isLoading: false,
        isError: !!res.error,
        showError: !!res.error,
        errorMsg: res.status,
      })
    }

    return (res.error && res.error) || res
  }

  render() {
    let { isLoading } = this.state

    let data = [
      {
        name: 'Trakinvest',
        Role: 'Software Intern',
        Description:
          'Get an opportunity to work with TrakInvest, as they move to the blockchain, learn and work on live projects on Hyperledger and Hashgraph.',
        Duration: '2 months',
        Eligibility:
          'Passed Blockchain curriculum successfully and completed projects on the lab to show 40 hours of coding completion',
        Positions: 2,
        Stipend: 'Matching Industry Standards',
        img:
          'https://media.licdn.com/dms/image/C510BAQEpCO0uqfKI4A/company-logo_200_200/0?e=2159024400&v=beta&t=PSdRXmDB5Ju9T0X3U_gIKb7jRBM1MJTuNQ5dhrUVdW4',
        action: 'https://hyrd.io/v/0915aa',
      },
      {
        name: 'LeeWayHertz',
        Role: 'Software Intern',
        Description:
          'Work directly with the tech team of LeeWayHertz to build Blockchain solutions for the enterprise in health care, supply chain and many other areas.',
        Eligibility:
          'Passed Blockchain curriculum successfully and completed projects on the lab to show 40 hours of coding completion',
        Duration: '2 months',
        Positions: 5,
        Stipend: 'Matching Industry Standards',
        img:
          'https://pbs.twimg.com/profile_images/728274464027205632/G4wjHrOz_400x400.jpg',
        action: 'https://hyrd.io/v/2e4670',
      },
    ]

    return (
      <Layout title={'Internships'}>
        <MenuStructure>
          <div className={'content-page-layout'}>
            <div className={'page-header'} />
            <div
              className={`page-content internship-content ${
                !isLoading ? 'content-show' : 'content-hide'
              }`}
            >
              <div className={'page-welcome'}>
                <span>Internships</span>
              </div>
              <div className={'page-caption'} />
              <div className={'internship-body'}>
                <div className={'internship-list'}>
                  {data.map(item => (
                    <div
                      className={'internship-item-container'}
                      key={item.name}
                    >
                      <Card classes={{ root: 'internship-item' }}>
                        <CardContent classes={{ root: 'intern-content' }}>
                          <div className={'int-heading'}>
                            <div className={'int-img'}>
                              <img src={item.img} />
                            </div>
                          </div>
                          <div className={'int-details'}>
                            <div className={'int-sub-details'}>
                              <div className={'int-name'}>
                                <span>{item.name}</span>
                              </div>
                              <div className={'int-available'}>
                                <span>
                                  {item.Positions} internships available
                                </span>
                                <span className={'int-more-info'}>
                                  <Tooltip
                                    title={`Eligibility: ${item.Eligibility}`}
                                    classes={{ tooltip: 'dark-tooltip' }}
                                  >
                                    <Info />
                                  </Tooltip>
                                </span>
                              </div>
                              <div className={'int-desc'}>
                                <span>{item.Description}</span>
                              </div>
                              <div className={'int-desc'}>
                                <span>
                                  <b>Duration: </b>
                                  {item.Duration}
                                </span>
                              </div>
                              <div className={'int-desc'}>
                                <span>
                                  <b>Stipend: </b>
                                  {item.Stipend}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`int-apply-btn ${
                                item.Positions === 0 ? 'disabled' : ''
                              }`}
                            >
                              <Button
                                variant="contained"
                                disabled={item.Positions === 0 || !item.action}
                                onClick={() =>
                                  window.open(item.action, '_blank')
                                }
                              >
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MenuStructure>
      </Layout>
    )
  }
}

export default InternshipsView
