import * as React from 'react'
import { Box } from 'grommet'
import { StyledBox } from './style'
import ChangePasswordForm from './ChangePasswordForm'
import Router from 'next/router'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

interface ChangePasswordProps {
  token: string
}

interface ChangePasswordState {
  showMsg: boolean
  showMsgType: string
  message: string
}

class ChangePassword extends React.Component<
  ChangePasswordProps,
  ChangePasswordState
> {
  constructor(props) {
    super(props)
    this.state = {
      showMsg: false,
      showMsgType: '',
      message: '',
    }

    this.showSnackMessage = this.showSnackMessage.bind(this)
  }
  componentDidMount() {
    if (localStorage.getItem('tkz')) {
      Router.push('/error','/mylabs')
    }
  }

  showSnackMessage(value, type, message) {
    this.setState({
      showMsg: value,
      showMsgType: type,
      message: message,
    })
  }

  render() {
    const { showMsg, showMsgType, message } = this.state
    const { showSnackMessage } = this
    const { token } = this.props

    return (
      <div>
        <StyledBox pad="large" round="small">
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={showMsg}
            onClose={() => this.setState({ showMsg: !showMsg })}
            autoHideDuration={5000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">
                {showMsgType === 'Error' && 'Error: '}
                {(message && message) || 'An error occurred. Please try again.'}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="close" color="inherit">
                <Close />
              </IconButton>,
            ]}
          />
          <Box direction="row">
            <ChangePasswordForm
              showSnackMessage={showSnackMessage}
              userToken={token}
            />
          </Box>
        </StyledBox>
      </div>
    )
  }
}
export default ChangePassword
