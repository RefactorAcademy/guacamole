import * as React from 'react'
import ChangePassword from '../layouts/ChangePassword'
import UnauthenticatedLayout from '../layouts/UnauthenticatedLayout'

class ChangePassComponent extends React.Component {
  render() {
    let { token } = this.props

    return (
      <UnauthenticatedLayout>
        <div className={'section-header'}>
          <span>Reset Password</span>
        </div>
        <div className={'section-form'}>
          <ChangePassword token={token} />
        </div>
      </UnauthenticatedLayout>
    )
  }
}

ChangePassComponent.getInitialProps = async function(context) {
  let { token } = context.query

  return { token: token }
}

export default ChangePassComponent
