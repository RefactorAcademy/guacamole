import { Box, Button } from 'grommet'
import * as React from 'react'
import { withFormik } from 'formik'
import { ENDPOINTS } from '../../constants'
import Link from 'next/link'
import { ErrorMsg, StyledForm, StyledFormField } from './style'
import * as Yup from 'yup'
import isomorphicUnfetch from 'isomorphic-unfetch'
// import { checkUserPacks } from '../../utilities'

interface FormValues {
  firstname: string
  lastname: string
  email: string
  password: string
  country: string
  mobile: string
}

interface FormProps {
  // firstname: string
  // lastname: string
  // email: string
  // password: string
  // country: string
  // mobile: string
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
      type="text"
      name="firstname"
      placeholder="First Name"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.firstname}
    />
    {errors.firstname && touched.firstname && errors.firstname}
    <StyledFormField
      type="text"
      name="lastname"
      placeholder="Last Name"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.lastname}
    />
    {errors.lastname && touched.lastname && errors.lastname}
    <StyledFormField
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
    />
    {errors.email && touched.email && errors.email}
    <StyledFormField
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {errors.password && touched.password && errors.password}
    <StyledFormField>
      <select
        name="country"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.country}
        style={{ border: 'none', outline: 'none' }}
      >
        <option value="">Select Country</option>
        <option value="Afganistan">Afghanistan</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="American Samoa">American Samoa</option>
      </select>
    </StyledFormField>
    {errors.country && touched.country && errors.country}
    <StyledFormField
      type="tel"
      name="mobile"
      placeholder="Mobile"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.mobile}
    />
    {errors.mobile && touched.mobile && errors.mobile}
    <Box direction="row" pad={{ top: '20px' }} justify="center">
      <Button
        className={'login-btn'}
        type="submit"
        disabled={isSubmitting}
        placeholder="Sign Up"
        label="Sign Up"
      />
    </Box>
    <Box
      direction="row"
      justify="center"
      style={{
        textAlign: 'center',
        color: 'Black',
        border: '1px solid black',
        borderRadius: '5px',
        marginTop: '20px',
        padding: '3px',
      }}
    >
      <Link
        href={{
          pathname: '/signin',
          query: {},
        }}
        as={'/signin'}
      >
        <div style={{ cursor: 'pointer' }}>
          Have an account?<span style={{ color: 'Blue' }}> Sign In</span>
        </div>
      </Link>
    </Box>
  </StyledForm>
)

const SignupForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    country: '',
    mobile: '',
  }),

  validationSchema: Yup.object().shape({
    firstname: Yup.string().required(
      <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>Required</ErrorMsg>
    ),
    lastname: Yup.string().required(
      <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>Required</ErrorMsg>
    ),
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
    country: Yup.string().required(
      <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>Required</ErrorMsg>
    ),
    mobile: Yup.string().required(
      <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>Required</ErrorMsg>
    ),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const { showSnackMessage } = props

    isomorphicUnfetch(`${ENDPOINTS.USER_SIGNUP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        mobileNo: values.mobile,
        password: values.password,
        country: values.country,
      }),
    }).then(response => {
      // console.log(response)
      // console.log('response')
      if (response.status === 200 && response.ok == true) {
        // console.log(response)
        showSnackMessage(true, 'Success', 'Successfully registered!!')
        // const authToken: string = response.headers.get('Authorization') || ''
        // localStorage.setItem('tkz', authToken)
      } else {
        showSnackMessage(true, '', 'Email Already Exists')
        setSubmitting(false)
      }
    })
  },
})(InnerForm)

export default SignupForm
