import { Box, Button } from 'grommet'
import * as React from 'react'
import { withFormik } from 'formik'
import { ENDPOINTS } from '../../constants'
import Link from 'next/link'
import { ErrorMsg, StyledForm, StyledFormField, StyledLink } from './style'
import * as Yup from 'yup'
import isomorphicUnfetch from 'isomorphic-unfetch'
// import { checkUserPacks } from '../../utilities'
import Router from 'next/router'

interface FormValues {
  email: string
  password: string
}

interface FormProps {
  email?: string
  password?: string
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
    {errors.email && touched.email && errors.email}
    <StyledFormField
      type="password"
      name="password"
      label="Password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {errors.password && touched.password && errors.password}
    <Box direction="row" pad={{ top: '20px' }} justify="center">
      <Button
        className={'login-btn'}
        type="submit"
        disabled={isSubmitting}
        label="Sign In"
      />
    </Box>
    <Box direction="row" pad={{ top: '20px' }} justify="center">
      <Link
        href={{
          pathname: '/forgot',
          query: {},
        }}
        as={'/forgotPassword'}
      >
        <StyledLink>Forgot Password?</StyledLink>
      </Link>
    </Box>
    {/* <Box direction="row" pad={{ top: '10px' }} justify="center">
      <Link
        href={{
          pathname: '/signup',
          query: {},
        }}
        as={'/signup'}
      >
        <StyledLink>
          Don't have an account?<span style={{ color: 'Blue' }}> Sign up</span>{' '}
        </StyledLink>
      </Link>
    </Box> */}
    <Box direction="row" pad={{ top: '10px' }} justify="center">
      <Link
        href={{
          pathname: '/traklabscourses',
          query: {},
        }}
        as={'/traklabscourses'}
      >
        <StyledLink>
          Want to discover the right course and lab?
          <span style={{ color: 'Blue' }}> Explore</span>{' '}
        </StyledLink>
      </Link>
    </Box>
  </StyledForm>
)

const SigninForm = withFormik<FormProps, FormValues>({
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
    password: Yup.string().required(
      <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>Required</ErrorMsg>
    ),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const { showSnackMessage } = props

    isomorphicUnfetch(`${ENDPOINTS.USER_LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.email,
        password: values.password,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
          // const authToken: string = response.headers.get('Authorization') || ''
          // localStorage.setItem('tkz', authToken)
        } else {
          showSnackMessage(true, '', 'Invalid Login Details')
          setSubmitting(false)
        }
        // return response && response.json()
      })
      .then(data => {
        let authToken: string = ''
        if (data && data.token) {
          authToken = data.token
          localStorage.setItem('tkz', authToken)
          localStorage.setItem('userName', values.email)
          // checkUserPacks()
          Router.push('/error', '/mylabs')
        }
      })
  },
})(InnerForm)

export default SigninForm
