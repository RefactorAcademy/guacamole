import * as React from 'react'
import Signin from '../layouts/Signin'
import UnauthenticatedLayout from '../layouts/UnauthenticatedLayout/index'

class SigninComponent extends React.Component {
  render() {
    let { fromReset } = this.props

    return (
      <UnauthenticatedLayout>
        <div className={'section-header'}>
          <span>Login</span>
        </div>
        <div className={'section-form'}>
          <Signin fromReset={!!fromReset} />
        </div>
      </UnauthenticatedLayout>
    )
  }
}

SigninComponent.getInitialProps = async function(context) {
  let { fromReset } = context.query

  return { fromReset: fromReset }
}

export default SigninComponent
