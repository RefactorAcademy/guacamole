import * as React from 'react'
import ForgotPassword from '../layouts/ForgotPassword'
import UnauthenticatedLayout from '../layouts/UnauthenticatedLayout'

export default () => (
  <UnauthenticatedLayout>
    <div className={'section-header'}>
      <span>Forgot Password?</span>
    </div>
    <div className={'section-form'}>
      <ForgotPassword />
    </div>
  </UnauthenticatedLayout>
)
