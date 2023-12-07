import * as React from 'react'
import { Box } from 'grommet'
import { StyledBox } from './style'
// import { Google, FacebookOption, LinkedinOption } from 'grommet-icons'
import SigninForm from './SigninForm'
import Router from 'next/router'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

interface SignInProps {
  fromReset: boolean
}

interface SignInState {
  showMsg: boolean
  showMsgType: string
  message: string
}

class Signin extends React.Component<SignInProps, SignInState> {
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

    if (this.props.fromReset) {
      this.showSnackMessage(
        true,
        'Success',
        'You have successfully changed your password. You can now login.'
      )
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
            <SigninForm showSnackMessage={showSnackMessage} />
          </Box>
        </StyledBox>
      </div>
    )
  }
}
export default Signin
