import { Box, Button } from 'grommet'
import * as React from 'react'
import { withFormik } from 'formik'
import { ENDPOINTS } from '../../constants'
import { ErrorMsg, StyledForm, StyledFormField } from './style'
import * as Yup from 'yup'
import isomorphicUnfetch from 'isomorphic-unfetch'
import Router from 'next/router'

interface FormValues {
  password: string
  confirmPassword: string
}

interface FormProps {
  password?: string
  confirmPassword?: string
  showSnackMessage: any
  userToken: string
}

function equalTo(ref: any, msg: any) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: function(value: any) {
      return value === this.resolve(ref)
    },
  })
}

Yup.addMethod(Yup.string, 'equalTo', equalTo)

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
      type="password"
      name="password"
      label="Password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {errors.password && touched.password && errors.password}
    <StyledFormField
      type="password"
      name="confirmPassword"
      label="Confirm Password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.confirmPassword}
    />
    {errors.confirmPassword &&
      touched.confirmPassword &&
      errors.confirmPassword}
    <Box direction="row" pad={{ top: '20px' }} justify="center">
      <Button
        className={'login-btn'}
        type="submit"
        disabled={isSubmitting}
        label="Submit"
      />
    </Box>
  </StyledForm>
)

const ChangePasswordForm = withFormik<FormProps, FormValues>({
  mapPropsToValues: () => ({ password: '', confirmPassword: '' }),

  validationSchema: Yup.object().shape({
    password: Yup.string().required(
      <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>Required</ErrorMsg>
    ),
    confirmPassword: Yup.string()
      .equalTo(
        Yup.ref('password'),
        <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>
          Passwords must match
        </ErrorMsg>
      )
      .required(
        <ErrorMsg style={{ color: 'red', marginBottom: 15 }}>Required</ErrorMsg>
      ),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const { showSnackMessage, userToken } = props

    isomorphicUnfetch(`${ENDPOINTS.USER_CHANGEPASS(userToken)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
    })
      .then(response => {
        setSubmitting(false)
        return response && response.json()
      })
      .then(data => {
        if (data.code === 200) {
          Router.push(
            {
              pathname: '/signin',
              query: { fromReset: true },
            },
            '/signin'
          )
        } else {
          showSnackMessage(true, 'Error', data.msg)
        }
      })
  },
})(InnerForm)

export default ChangePasswordForm
