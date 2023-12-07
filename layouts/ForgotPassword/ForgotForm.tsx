import { Box, Button } from 'grommet'
import * as React from 'react'
import { withFormik } from 'formik'
// import { ENDPOINTS } from '../../constants'
import Link from 'next/link'
import { ErrorMsg, StyledForm, StyledFormField, StyledLink } from './style'
import * as Yup from 'yup'
// import isomorphicUnfetch from 'isomorphic-unfetch'
import Router from 'next/router'

interface FormValues {
  email: string
  password: string
}

interface FormProps {
  email?: string
  showSnackMessage: any
}

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  /* and other goodies */
}) => (
  <StyledForm onSubmit={handleSubmit}>
    <StyledFormField
      type="email"
      name="email"
      label="Email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
    />
    <StyledFormField
      type="password"
      name="password"
      label="New Password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {errors.email && touched.email && errors.email}
    <Box direction="row" pad={{ top: '20px' }} justify="center">
      <Button
        className={'login-btn'}
        type="submit"
        disabled={isSubmitting}
        label="Submit"
      />
    </Box>
    <Box direction="row" pad={{ top: '20px' }} justify="center">
      <Link
        href={{
          pathname: '/signin',
          query: {},
        }}
        as={'/signin'}
      >
        <StyledLink>Don't Bother? Sign In</StyledLink>
      </Link>
    </Box>
  </StyledForm>
)

const ForgotForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({ email: '', password: '' }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email(
        <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>
          Invalid email address
        </ErrorMsg>
      )
      .required(
        <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>Required</ErrorMsg>
      ),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const { showSnackMessage } = props

    // isomorphicUnfetch(
    //   `${ENDPOINTS.USER_FORGOT(encodeURIComponent(values.email))}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // )
    //   .then(response => {
    //     setSubmitting(false)
    //     return response && response.json()
    //   })
    //   .then(data => {
    //     if (data.code === 200) {
    //       showSnackMessage(true, 'Success', data.msg)
    //     } else {
    //       showSnackMessage(true, 'Error', data.msg)
    //     }
    //   })
    // /resetPassword/{email}/{password}

    fetch(
      `https://accounts.traklabs.io/resetPassword/${values.email}/${
        values.password
      }`,
      {
        method: 'POST',
      }
    )
      .then(res => {
        setSubmitting(false)
        return res && res.json()
      })
      .then(data => {
        if (data == true) {
          showSnackMessage(true, 'Success', 'Check your mail to reset')
          Router.push('/signin')
        } else {
          showSnackMessage(true, '', 'Email not exist')
        }
      })
  },
})(InnerForm)

export default ForgotForm
