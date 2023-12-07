import * as React from 'react'
import Signup from '../layouts/Signup'
import UnauthenticatedLayout from '../layouts/UnauthenticatedLayout/index2'

class SignupComponent extends React.Component {
  render() {
    let { fromReset } = this.props

    return (
      <UnauthenticatedLayout>
        <div className={'section-header'}>
          <span>Signup</span>
        </div>
        <div className={'section-form'}>
          <Signup fromReset={!!fromReset} />
        </div>
      </UnauthenticatedLayout>
    )
  }
}

SignupComponent.getInitialProps = async function(context) {
  let { fromReset } = context.query

  return { fromReset: fromReset }
}

export default SignupComponent
