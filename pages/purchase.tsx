import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Snackbar from '@material-ui/core/Snackbar'
import FullBodyWelcome from 'components/FullBodyWelcome'
import { PostAdd } from '@material-ui/icons'
import MenuStructure from '../layouts/MenuStructure/MenuStructureWitoutLogout'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Router from 'next/router'
// import OktaAuth from '@okta/okta-auth-js';
// import { useOktaAuth } from '@okta/okta-react';
// import { BrowserRouter, Route } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://app.traklabs.io">
        Traklabs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function PurchasePage() {
  const classes = useStyles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNum] = useState('')
  const [country, setCountry] = useState('India')
  const [password, setPassword] = useState('')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [planInfo, setPlanInfo] = useState({})
  const [courseInfo, setCourseInfo] = useState({})
  const [actualPrice, setActualPrice] = useState(0)
  const [priceAfterCoupon, setPriceAfterCoupon] = useState(0)
  const [razorPaymentId, setRazorPaymentId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCouponNotApplied, setIsCouponNotApplied] = useState(false)
  const [countryCode, setCountryCode] = useState('91')

  //extra
  //const { authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState()

  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (!localStorage.getItem('selectedCourse')) {
      Router.push('/error', '/traklabscourses')
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    const script1 = document.createElement('script')
    script1.src =
      'https://global.oktacdn.com/okta-auth-js/4.0.0/okta-auth-js.min.js'
    script1.async = true
    document.body.appendChild(script1)

    fetchPlanInfo()
  }, [])

  const fetchPlanInfo = () => {
    let course = localStorage.getItem('selectedCourse')
    fetch(`https://accounts.traklabs.io/guacamole/courses/${course}`)
      .then(res => res.json())
      .then(data => {
        setActualPrice(data.cost.inr)
        setCourseInfo(data)
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(
      firstName,
      lastName,
      country,
      coupon,
      email,
      priceAfterCoupon,
      actualPrice
    )
    checkUserExistence()
  }

  const checkUserExistence = () => {
    setIsLoading(true)
    fetch(`https://accounts.traklabs.io/checkuser/${email}`)
      .then(response => {
        return response.text()
      })
      .then(data => {
        if (data.length > 0) {
          return JSON.parse(data)
        } else {
          return null
        }
      })
      .then(data => {
        if (data != null) {
          checkPlanExist()
        } else {
          registerUser()
        }
      })
  }

  const checkPlanExist = () => {
    let course = localStorage.getItem('selectedCourse')
    fetch(`https://accounts.traklabs.io/guacamole/courses/${email}/${course}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        if (data == true) {
          alert('You have already purchased this course')
          Router.push('/error', '/signin')
        } else {
          // NOPEEEE
          doPayment()
        }
      })
  }

  const handleTransaction = res => {
    console.log(res)
    alert(res.razorpay_payment_id)
    setIsLoading(true)
    // console.log(res)
    setRazorPaymentId(res.razorpay_payment_id)
    saveOrder(res.razorpay_payment_id)
  }

  const saveOrder = razorPayId => {
    let paidAmount = appliedCoupon ? priceAfterCoupon * 100 : actualPrice * 100
    let courseId = localStorage.getItem('selectedCourse')
    let body = {
      orderedUserEmail: email,
      razorPayId: razorPayId,
      paidAmount: paidAmount,
      paidAt: Date.now(),
      couponCodeUsed: appliedCoupon,
      courseId: courseId,
    }

    fetch(`https://accounts.traklabs.io/orders/saveOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        if (data == true) {
          console.log(data)
          setIsLoading(false)
          alert('Your pack is activated')
          Router.push('/error', '/signin')
        } else {
          setIsLoading(false)
          alert('Your pack is not activated')
          Router.push('/error', '/signin')
        }
      })
  }

  const doPayment = () => {
    setIsLoading(false)

    let amount = appliedCoupon ? priceAfterCoupon : actualPrice

    let options = {
      key: 'rzp_test_k1VKq7LFWj0wvj',
      // 'rzp_test_BVhEw45VQa6xCL',
      // RK9k4iSVYK07EkDWLyOIe6op
      // "rzp_live_6A39SBe34z7HbU", "EqrvJHQ2lGHDmfZdptkh2M9S"
      // "order_id":,
      amount: amount * 100,
      name: 'TrakInvest',
      description: 'Buy plan',
      handler: handleTransaction,
      prefill: {
        name: firstName,
        email: email,
      },
      notes: {
        address: 'Hello World',
      },
      theme: {
        color: '#F37254',
      },
      modal: {
        ondismiss: function() {
          window.location.reload()
        },
      },
    }
    let rzp = window.Razorpay(options)
    let result = rzp.open()
  }

  const registerUser = () => {
    fetch(`https://accounts.traklabs.io/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
        country: country,
        countryCode: countryCode,
      }),
    }).then(() => {
      doPayment()
    })
  }

  const handleCoupon = () => {
    fetchCoupon(coupon)
  }

  const fetchCoupon = couponCode => {
    fetch(`https://accounts.traklabs.io/coupons/coupon/${couponCode}`)
      .then(res => {
        return res.text()
      })
      .then(data => {
        if (data.length > 0) {
          return JSON.parse(data)
        } else {
          return null
        }
      })
      .then(data => {
        if (data == null) {
          setIsCouponNotApplied(true)
          setOpen(true)
          setCouponApplied(false)
        } else {
          // console.log('coupns is', data)
          if (data.validTill > Date.now() && data.usageCount < data.maxUsage) {
            for (let i = 0; i < data.applicablePlanIds.length; i++) {
              if (
                data.applicablePlanIds[i] ==
                localStorage.getItem('selectedCourse')
              ) {
                let price = actualPrice
                price = price - price * (data.discountPercentage / 100)

                setPriceAfterCoupon(price)

                setCouponApplied(true)
                setAppliedCoupon(couponCode)
                setDiscountPercentage(data.discountPercentage)

                setOpen(true)
                return
              }
            }
          }
          setIsCouponNotApplied(true)
          setOpen(true)
          setCouponApplied(false)
        }
      })
  }

  return (
    <Layout title={'Purchase'}>
      <MenuStructure>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h1" />
            <form className={classes.form} onSubmit={handleSubmit.bind(this)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={e => {
                      setFirstName(e.target.value)
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={e => {
                      setLastName(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    onChange={e => {
                      setEmail(e.target.value)
                    }}
                  />
                </Grid>

                {isLoading && (
                  <div
                    style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      zIndex: '99',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <Loader />
                  </div>
                )}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e => {
                      setPassword(e.target.value)
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Select
                      style={{ width: '120px', marginRight: '8px' }}
                      variant="outlined"
                      required
                      fullWidth
                      id="countryCode"
                      name="countryCode"
                      defaultValue="91"
                      onChange={e => {
                        setCountryCode(e.target.value)
                      }}
                    >
                      <MenuItem data-countryCode="DZ" value="213">
                        Algeria (+213)
                      </MenuItem>
                      <MenuItem data-countryCode="AD" value="376">
                        Andorra (+376)
                      </MenuItem>
                      <MenuItem data-countryCode="AO" value="244">
                        Angola (+244)
                      </MenuItem>
                      <MenuItem data-countryCode="AI" value="1264">
                        Anguilla (+1264)
                      </MenuItem>
                      <MenuItem data-countryCode="AG" value="1268">
                        Antigua &amp; Barbuda (+1268)
                      </MenuItem>
                      <MenuItem data-countryCode="AR" value="54">
                        Argentina (+54)
                      </MenuItem>
                      <MenuItem data-countryCode="AM" value="374">
                        Armenia (+374)
                      </MenuItem>
                      <MenuItem data-countryCode="AW" value="297">
                        Aruba (+297)
                      </MenuItem>
                      <MenuItem data-countryCode="AU" value="61">
                        Australia (+61)
                      </MenuItem>
                      <MenuItem data-countryCode="AT" value="43">
                        Austria (+43)
                      </MenuItem>
                      <MenuItem data-countryCode="AZ" value="994">
                        Azerbaijan (+994)
                      </MenuItem>
                      <MenuItem data-countryCode="BS" value="1242">
                        Bahamas (+1242)
                      </MenuItem>
                      <MenuItem data-countryCode="BH" value="973">
                        Bahrain (+973)
                      </MenuItem>
                      <MenuItem data-countryCode="BD" value="880">
                        Bangladesh (+880)
                      </MenuItem>
                      <MenuItem data-countryCode="BB" value="1246">
                        Barbados (+1246)
                      </MenuItem>
                      <MenuItem data-countryCode="BY" value="375">
                        Belarus (+375)
                      </MenuItem>
                      <MenuItem data-countryCode="BE" value="32">
                        Belgium (+32)
                      </MenuItem>
                      <MenuItem data-countryCode="BZ" value="501">
                        Belize (+501)
                      </MenuItem>
                      <MenuItem data-countryCode="BJ" value="229">
                        Benin (+229)
                      </MenuItem>
                      <MenuItem data-countryCode="BM" value="1441">
                        Bermuda (+1441)
                      </MenuItem>
                      <MenuItem data-countryCode="BT" value="975">
                        Bhutan (+975)
                      </MenuItem>
                      <MenuItem data-countryCode="BO" value="591">
                        Bolivia (+591)
                      </MenuItem>
                      <MenuItem data-countryCode="BA" value="387">
                        Bosnia Herzegovina (+387)
                      </MenuItem>
                      <MenuItem data-countryCode="BW" value="267">
                        Botswana (+267)
                      </MenuItem>
                      <MenuItem data-countryCode="BR" value="55">
                        Brazil (+55)
                      </MenuItem>
                      <MenuItem data-countryCode="BN" value="673">
                        Brunei (+673)
                      </MenuItem>
                      <MenuItem data-countryCode="BG" value="359">
                        Bulgaria (+359)
                      </MenuItem>
                      <MenuItem data-countryCode="BF" value="226">
                        Burkina Faso (+226)
                      </MenuItem>
                      <MenuItem data-countryCode="BI" value="257">
                        Burundi (+257)
                      </MenuItem>
                      <MenuItem data-countryCode="KH" value="855">
                        Cambodia (+855)
                      </MenuItem>
                      <MenuItem data-countryCode="CM" value="237">
                        Cameroon (+237)
                      </MenuItem>
                      <MenuItem data-countryCode="CA" value="1">
                        Canada (+1)
                      </MenuItem>
                      <MenuItem data-countryCode="CV" value="238">
                        Cape Verde Islands (+238)
                      </MenuItem>
                      <MenuItem data-countryCode="KY" value="1345">
                        Cayman Islands (+1345)
                      </MenuItem>
                      <MenuItem data-countryCode="CF" value="236">
                        Central African Republic (+236)
                      </MenuItem>
                      <MenuItem data-countryCode="CL" value="56">
                        Chile (+56)
                      </MenuItem>
                      <MenuItem data-countryCode="CN" value="86">
                        China (+86)
                      </MenuItem>
                      <MenuItem data-countryCode="CO" value="57">
                        Colombia (+57)
                      </MenuItem>
                      <MenuItem data-countryCode="KM" value="269">
                        Comoros (+269)
                      </MenuItem>
                      <MenuItem data-countryCode="CG" value="242">
                        Congo (+242)
                      </MenuItem>
                      <MenuItem data-countryCode="CK" value="682">
                        Cook Islands (+682)
                      </MenuItem>
                      <MenuItem data-countryCode="CR" value="506">
                        Costa Rica (+506)
                      </MenuItem>
                      <MenuItem data-countryCode="HR" value="385">
                        Croatia (+385)
                      </MenuItem>
                      <MenuItem data-countryCode="CU" value="53">
                        Cuba (+53)
                      </MenuItem>
                      <MenuItem data-countryCode="CY" value="90392">
                        Cyprus North (+90392)
                      </MenuItem>
                      <MenuItem data-countryCode="CY" value="357">
                        Cyprus South (+357)
                      </MenuItem>
                      <MenuItem data-countryCode="CZ" value="42">
                        Czech Republic (+42)
                      </MenuItem>
                      <MenuItem data-countryCode="DK" value="45">
                        Denmark (+45)
                      </MenuItem>
                      <MenuItem data-countryCode="DJ" value="253">
                        Djibouti (+253)
                      </MenuItem>
                      <MenuItem data-countryCode="DM" value="1809">
                        Dominica (+1809)
                      </MenuItem>
                      <MenuItem data-countryCode="DO" value="1809">
                        Dominican Republic (+1809)
                      </MenuItem>
                      <MenuItem data-countryCode="EC" value="593">
                        Ecuador (+593)
                      </MenuItem>
                      <MenuItem data-countryCode="EG" value="20">
                        Egypt (+20)
                      </MenuItem>
                      <MenuItem data-countryCode="SV" value="503">
                        El Salvador (+503)
                      </MenuItem>
                      <MenuItem data-countryCode="GQ" value="240">
                        Equatorial Guinea (+240)
                      </MenuItem>
                      <MenuItem data-countryCode="ER" value="291">
                        Eritrea (+291)
                      </MenuItem>
                      <MenuItem data-countryCode="EE" value="372">
                        Estonia (+372)
                      </MenuItem>
                      <MenuItem data-countryCode="ET" value="251">
                        Ethiopia (+251)
                      </MenuItem>
                      <MenuItem data-countryCode="FK" value="500">
                        Falkland Islands (+500)
                      </MenuItem>
                      <MenuItem data-countryCode="FO" value="298">
                        Faroe Islands (+298)
                      </MenuItem>
                      <MenuItem data-countryCode="FJ" value="679">
                        Fiji (+679)
                      </MenuItem>
                      <MenuItem data-countryCode="FI" value="358">
                        Finland (+358)
                      </MenuItem>
                      <MenuItem data-countryCode="FR" value="33">
                        France (+33)
                      </MenuItem>
                      <MenuItem data-countryCode="GF" value="594">
                        French Guiana (+594)
                      </MenuItem>
                      <MenuItem data-countryCode="PF" value="689">
                        French Polynesia (+689)
                      </MenuItem>
                      <MenuItem data-countryCode="GA" value="241">
                        Gabon (+241)
                      </MenuItem>
                      <MenuItem data-countryCode="GM" value="220">
                        Gambia (+220)
                      </MenuItem>
                      <MenuItem data-countryCode="GE" value="7880">
                        Georgia (+7880)
                      </MenuItem>
                      <MenuItem data-countryCode="DE" value="49">
                        Germany (+49)
                      </MenuItem>
                      <MenuItem data-countryCode="GH" value="233">
                        Ghana (+233)
                      </MenuItem>
                      <MenuItem data-countryCode="GI" value="350">
                        Gibraltar (+350)
                      </MenuItem>
                      <MenuItem data-countryCode="GR" value="30">
                        Greece (+30)
                      </MenuItem>
                      <MenuItem data-countryCode="GL" value="299">
                        Greenland (+299)
                      </MenuItem>
                      <MenuItem data-countryCode="GD" value="1473">
                        Grenada (+1473)
                      </MenuItem>
                      <MenuItem data-countryCode="GP" value="590">
                        Guadeloupe (+590)
                      </MenuItem>
                      <MenuItem data-countryCode="GU" value="671">
                        Guam (+671)
                      </MenuItem>
                      <MenuItem data-countryCode="GT" value="502">
                        Guatemala (+502)
                      </MenuItem>
                      <MenuItem data-countryCode="GN" value="224">
                        Guinea (+224)
                      </MenuItem>
                      <MenuItem data-countryCode="GW" value="245">
                        Guinea - Bissau (+245)
                      </MenuItem>
                      <MenuItem data-countryCode="GY" value="592">
                        Guyana (+592)
                      </MenuItem>
                      <MenuItem data-countryCode="HT" value="509">
                        Haiti (+509)
                      </MenuItem>
                      <MenuItem data-countryCode="HN" value="504">
                        Honduras (+504)
                      </MenuItem>
                      <MenuItem data-countryCode="HK" value="852">
                        Hong Kong (+852)
                      </MenuItem>
                      <MenuItem data-countryCode="HU" value="36">
                        Hungary (+36)
                      </MenuItem>
                      <MenuItem data-countryCode="IS" value="354">
                        Iceland (+354)
                      </MenuItem>
                      <MenuItem data-countryCode="IN" value="91">
                        India (+91)
                      </MenuItem>
                      <MenuItem data-countryCode="ID" value="62">
                        Indonesia (+62)
                      </MenuItem>
                      <MenuItem data-countryCode="IR" value="98">
                        Iran (+98)
                      </MenuItem>
                      <MenuItem data-countryCode="IQ" value="964">
                        Iraq (+964)
                      </MenuItem>
                      <MenuItem data-countryCode="IE" value="353">
                        Ireland (+353)
                      </MenuItem>
                      <MenuItem data-countryCode="IL" value="972">
                        Israel (+972)
                      </MenuItem>
                      <MenuItem data-countryCode="IT" value="39">
                        Italy (+39)
                      </MenuItem>
                      <MenuItem data-countryCode="JM" value="1876">
                        Jamaica (+1876)
                      </MenuItem>
                      <MenuItem data-countryCode="JP" value="81">
                        Japan (+81)
                      </MenuItem>
                      <MenuItem data-countryCode="JO" value="962">
                        Jordan (+962)
                      </MenuItem>
                      <MenuItem data-countryCode="KZ" value="7">
                        Kazakhstan (+7)
                      </MenuItem>
                      <MenuItem data-countryCode="KE" value="254">
                        Kenya (+254)
                      </MenuItem>
                      <MenuItem data-countryCode="KI" value="686">
                        Kiribati (+686)
                      </MenuItem>
                      <MenuItem data-countryCode="KP" value="850">
                        Korea North (+850)
                      </MenuItem>
                      <MenuItem data-countryCode="KR" value="82">
                        Korea South (+82)
                      </MenuItem>
                      <MenuItem data-countryCode="KW" value="965">
                        Kuwait (+965)
                      </MenuItem>
                      <MenuItem data-countryCode="KG" value="996">
                        Kyrgyzstan (+996)
                      </MenuItem>
                      <MenuItem data-countryCode="LA" value="856">
                        Laos (+856)
                      </MenuItem>
                      <MenuItem data-countryCode="LV" value="371">
                        Latvia (+371)
                      </MenuItem>
                      <MenuItem data-countryCode="LB" value="961">
                        Lebanon (+961)
                      </MenuItem>
                      <MenuItem data-countryCode="LS" value="266">
                        Lesotho (+266)
                      </MenuItem>
                      <MenuItem data-countryCode="LR" value="231">
                        Liberia (+231)
                      </MenuItem>
                      <MenuItem data-countryCode="LY" value="218">
                        Libya (+218)
                      </MenuItem>
                      <MenuItem data-countryCode="LI" value="417">
                        Liechtenstein (+417)
                      </MenuItem>
                      <MenuItem data-countryCode="LT" value="370">
                        Lithuania (+370)
                      </MenuItem>
                      <MenuItem data-countryCode="LU" value="352">
                        Luxembourg (+352)
                      </MenuItem>
                      <MenuItem data-countryCode="MO" value="853">
                        Macao (+853)
                      </MenuItem>
                      <MenuItem data-countryCode="MK" value="389">
                        Macedonia (+389)
                      </MenuItem>
                      <MenuItem data-countryCode="MG" value="261">
                        Madagascar (+261)
                      </MenuItem>
                      <MenuItem data-countryCode="MW" value="265">
                        Malawi (+265)
                      </MenuItem>
                      <MenuItem data-countryCode="MY" value="60">
                        Malaysia (+60)
                      </MenuItem>
                      <MenuItem data-countryCode="MV" value="960">
                        Maldives (+960)
                      </MenuItem>
                      <MenuItem data-countryCode="ML" value="223">
                        Mali (+223)
                      </MenuItem>
                      <MenuItem data-countryCode="MT" value="356">
                        Malta (+356)
                      </MenuItem>
                      <MenuItem data-countryCode="MH" value="692">
                        Marshall Islands (+692)
                      </MenuItem>
                      <MenuItem data-countryCode="MQ" value="596">
                        Martinique (+596)
                      </MenuItem>
                      <MenuItem data-countryCode="MR" value="222">
                        Mauritania (+222)
                      </MenuItem>
                      <MenuItem data-countryCode="YT" value="269">
                        Mayotte (+269)
                      </MenuItem>
                      <MenuItem data-countryCode="MX" value="52">
                        Mexico (+52)
                      </MenuItem>
                      <MenuItem data-countryCode="FM" value="691">
                        Micronesia (+691)
                      </MenuItem>
                      <MenuItem data-countryCode="MD" value="373">
                        Moldova (+373)
                      </MenuItem>
                      <MenuItem data-countryCode="MC" value="377">
                        Monaco (+377)
                      </MenuItem>
                      <MenuItem data-countryCode="MN" value="976">
                        Mongolia (+976)
                      </MenuItem>
                      <MenuItem data-countryCode="MS" value="1664">
                        Montserrat (+1664)
                      </MenuItem>
                      <MenuItem data-countryCode="MA" value="212">
                        Morocco (+212)
                      </MenuItem>
                      <MenuItem data-countryCode="MZ" value="258">
                        Mozambique (+258)
                      </MenuItem>
                      <MenuItem data-countryCode="MN" value="95">
                        Myanmar (+95)
                      </MenuItem>
                      <MenuItem data-countryCode="NA" value="264">
                        Namibia (+264)
                      </MenuItem>
                      <MenuItem data-countryCode="NR" value="674">
                        Nauru (+674)
                      </MenuItem>
                      <MenuItem data-countryCode="NP" value="977">
                        Nepal (+977)
                      </MenuItem>
                      <MenuItem data-countryCode="NL" value="31">
                        Netherlands (+31)
                      </MenuItem>
                      <MenuItem data-countryCode="NC" value="687">
                        New Caledonia (+687)
                      </MenuItem>
                      <MenuItem data-countryCode="NZ" value="64">
                        New Zealand (+64)
                      </MenuItem>
                      <MenuItem data-countryCode="NI" value="505">
                        Nicaragua (+505)
                      </MenuItem>
                      <MenuItem data-countryCode="NE" value="227">
                        Niger (+227)
                      </MenuItem>
                      <MenuItem data-countryCode="NG" value="234">
                        Nigeria (+234)
                      </MenuItem>
                      <MenuItem data-countryCode="NU" value="683">
                        Niue (+683)
                      </MenuItem>
                      <MenuItem data-countryCode="NF" value="672">
                        Norfolk Islands (+672)
                      </MenuItem>
                      <MenuItem data-countryCode="NP" value="670">
                        Northern Marianas (+670)
                      </MenuItem>
                      <MenuItem data-countryCode="NO" value="47">
                        Norway (+47)
                      </MenuItem>
                      <MenuItem data-countryCode="OM" value="968">
                        Oman (+968)
                      </MenuItem>
                      <MenuItem data-countryCode="PW" value="680">
                        Palau (+680)
                      </MenuItem>
                      <MenuItem data-countryCode="PA" value="507">
                        Panama (+507)
                      </MenuItem>
                      <MenuItem data-countryCode="PG" value="675">
                        Papua New Guinea (+675)
                      </MenuItem>
                      <MenuItem data-countryCode="PY" value="595">
                        Paraguay (+595)
                      </MenuItem>
                      <MenuItem data-countryCode="PE" value="51">
                        Peru (+51)
                      </MenuItem>
                      <MenuItem data-countryCode="PH" value="63">
                        Philippines (+63)
                      </MenuItem>
                      <MenuItem data-countryCode="PL" value="48">
                        Poland (+48)
                      </MenuItem>
                      <MenuItem data-countryCode="PT" value="351">
                        Portugal (+351)
                      </MenuItem>
                      <MenuItem data-countryCode="PR" value="1787">
                        Puerto Rico (+1787)
                      </MenuItem>
                      <MenuItem data-countryCode="QA" value="974">
                        Qatar (+974)
                      </MenuItem>
                      <MenuItem data-countryCode="RE" value="262">
                        Reunion (+262)
                      </MenuItem>
                      <MenuItem data-countryCode="RO" value="40">
                        Romania (+40)
                      </MenuItem>
                      <MenuItem data-countryCode="RU" value="7">
                        Russia (+7)
                      </MenuItem>
                      <MenuItem data-countryCode="RW" value="250">
                        Rwanda (+250)
                      </MenuItem>
                      <MenuItem data-countryCode="SM" value="378">
                        San Marino (+378)
                      </MenuItem>
                      <MenuItem data-countryCode="ST" value="239">
                        Sao Tome &amp; Principe (+239)
                      </MenuItem>
                      <MenuItem data-countryCode="SA" value="966">
                        Saudi Arabia (+966)
                      </MenuItem>
                      <MenuItem data-countryCode="SN" value="221">
                        Senegal (+221)
                      </MenuItem>
                      <MenuItem data-countryCode="CS" value="381">
                        Serbia (+381)
                      </MenuItem>
                      <MenuItem data-countryCode="SC" value="248">
                        Seychelles (+248)
                      </MenuItem>
                      <MenuItem data-countryCode="SL" value="232">
                        Sierra Leone (+232)
                      </MenuItem>
                      <MenuItem data-countryCode="SG" value="65">
                        Singapore (+65)
                      </MenuItem>
                      <MenuItem data-countryCode="SK" value="421">
                        Slovak Republic (+421)
                      </MenuItem>
                      <MenuItem data-countryCode="SI" value="386">
                        Slovenia (+386)
                      </MenuItem>
                      <MenuItem data-countryCode="SB" value="677">
                        Solomon Islands (+677)
                      </MenuItem>
                      <MenuItem data-countryCode="SO" value="252">
                        Somalia (+252)
                      </MenuItem>
                      <MenuItem data-countryCode="ZA" value="27">
                        South Africa (+27)
                      </MenuItem>
                      <MenuItem data-countryCode="ES" value="34">
                        Spain (+34)
                      </MenuItem>
                      <MenuItem data-countryCode="LK" value="94">
                        Sri Lanka (+94)
                      </MenuItem>
                      <MenuItem data-countryCode="SH" value="290">
                        St. Helena (+290)
                      </MenuItem>
                      <MenuItem data-countryCode="KN" value="1869">
                        St. Kitts (+1869)
                      </MenuItem>
                      <MenuItem data-countryCode="SC" value="1758">
                        St. Lucia (+1758)
                      </MenuItem>
                      <MenuItem data-countryCode="SD" value="249">
                        Sudan (+249)
                      </MenuItem>
                      <MenuItem data-countryCode="SR" value="597">
                        Suriname (+597)
                      </MenuItem>
                      <MenuItem data-countryCode="SZ" value="268">
                        Swaziland (+268)
                      </MenuItem>
                      <MenuItem data-countryCode="SE" value="46">
                        Sweden (+46)
                      </MenuItem>
                      <MenuItem data-countryCode="CH" value="41">
                        Switzerland (+41)
                      </MenuItem>
                      <MenuItem data-countryCode="SI" value="963">
                        Syria (+963)
                      </MenuItem>
                      <MenuItem data-countryCode="TW" value="886">
                        Taiwan (+886)
                      </MenuItem>
                      <MenuItem data-countryCode="TJ" value="7">
                        Tajikstan (+7)
                      </MenuItem>
                      <MenuItem data-countryCode="TH" value="66">
                        Thailand (+66)
                      </MenuItem>
                      <MenuItem data-countryCode="TG" value="228">
                        Togo (+228)
                      </MenuItem>
                      <MenuItem data-countryCode="TO" value="676">
                        Tonga (+676)
                      </MenuItem>
                      <MenuItem data-countryCode="TT" value="1868">
                        Trinidad &amp; Tobago (+1868)
                      </MenuItem>
                      <MenuItem data-countryCode="TN" value="216">
                        Tunisia (+216)
                      </MenuItem>
                      <MenuItem data-countryCode="TR" value="90">
                        Turkey (+90)
                      </MenuItem>
                      <MenuItem data-countryCode="TM" value="7">
                        Turkmenistan (+7)
                      </MenuItem>
                      <MenuItem data-countryCode="TM" value="993">
                        Turkmenistan (+993)
                      </MenuItem>
                      <MenuItem data-countryCode="TC" value="1649">
                        Turks &amp; Caicos Islands (+1649)
                      </MenuItem>
                      <MenuItem data-countryCode="TV" value="688">
                        Tuvalu (+688)
                      </MenuItem>
                      <MenuItem data-countryCode="UG" value="256">
                        Uganda (+256)
                      </MenuItem>
                      {/* <!-- <MenuItem data-countryCode="GB" value="44">UK (+44)</MenuItem> --> */}
                      <MenuItem data-countryCode="UA" value="380">
                        Ukraine (+380)
                      </MenuItem>
                      <MenuItem data-countryCode="AE" value="971">
                        United Arab Emirates (+971)
                      </MenuItem>
                      <MenuItem data-countryCode="UY" value="598">
                        Uruguay (+598)
                      </MenuItem>
                      {/* <!-- <MenuItem data-countryCode="US" value="1">USA (+1)</MenuItem> --> */}
                      <MenuItem data-countryCode="UZ" value="7">
                        Uzbekistan (+7)
                      </MenuItem>
                      <MenuItem data-countryCode="VU" value="678">
                        Vanuatu (+678)
                      </MenuItem>
                      <MenuItem data-countryCode="VA" value="379">
                        Vatican City (+379)
                      </MenuItem>
                      <MenuItem data-countryCode="VE" value="58">
                        Venezuela (+58)
                      </MenuItem>
                      <MenuItem data-countryCode="VN" value="84">
                        Vietnam (+84)
                      </MenuItem>
                      <MenuItem data-countryCode="VG" value="84">
                        Virgin Islands - British (+1284)
                      </MenuItem>
                      <MenuItem data-countryCode="VI" value="84">
                        Virgin Islands - US (+1340)
                      </MenuItem>
                      <MenuItem data-countryCode="WF" value="681">
                        Wallis &amp; Futuna (+681)
                      </MenuItem>
                      <MenuItem data-countryCode="YE" value="969">
                        Yemen (North)(+969)
                      </MenuItem>
                      <MenuItem data-countryCode="YE" value="967">
                        Yemen (South)(+967)
                      </MenuItem>
                      <MenuItem data-countryCode="ZM" value="260">
                        Zambia (+260)
                      </MenuItem>
                      <MenuItem data-countryCode="ZW" value="263">
                        Zimbabwe (+263)
                      </MenuItem>
                    </Select>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="mobileNo"
                      label="Mobile Number"
                      name="mobileNo"
                      InputProps={{
                        inputProps: { minLength: 10, maxLength: 10 },
                      }}
                      autoComplete="mobileNo"
                      onChange={e => {
                        setMobileNum(e.target.value)
                      }}
                    />
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <Select
                    variant="outlined"
                    required
                    fullWidth
                    id="country"
                    name="country"
                    defaultValue="India"
                    onChange={e => {
                      setCountry(e.target.value)
                    }}
                  >
                    {/* <MenuItem value="Country">
                      <em>Country</em>
                    </MenuItem> */}
                    <MenuItem value="Afganistan">Afghanistan</MenuItem>
                    <MenuItem value="Albania">Albania</MenuItem>
                    <MenuItem value="Algeria">Algeria</MenuItem>
                    <MenuItem value="American Samoa">American Samoa</MenuItem>
                    <MenuItem value="Andorra">Andorra</MenuItem>
                    <MenuItem value="Angola">Angola</MenuItem>
                    <MenuItem value="Anguilla">Anguilla</MenuItem>
                    <MenuItem value="Antigua & Barbuda">
                      Antigua & Barbuda
                    </MenuItem>
                    <MenuItem value="Argentina">Argentina</MenuItem>
                    <MenuItem value="Armenia">Armenia</MenuItem>
                    <MenuItem value="Aruba">Aruba</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="Austria">Austria</MenuItem>
                    <MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
                    <MenuItem value="Bahamas">Bahamas</MenuItem>
                    <MenuItem value="Bahrain">Bahrain</MenuItem>
                    <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                    <MenuItem value="Barbados">Barbados</MenuItem>
                    <MenuItem value="Belarus">Belarus</MenuItem>
                    <MenuItem value="Belgium">Belgium</MenuItem>
                    <MenuItem value="Belize">Belize</MenuItem>
                    <MenuItem value="Benin">Benin</MenuItem>
                    <MenuItem value="Bermuda">Bermuda</MenuItem>
                    <MenuItem value="Bhutan">Bhutan</MenuItem>
                    <MenuItem value="Bolivia">Bolivia</MenuItem>
                    <MenuItem value="Bonaire">Bonaire</MenuItem>
                    <MenuItem value="Bosnia & Herzegovina">
                      Bosnia & Herzegovina
                    </MenuItem>
                    <MenuItem value="Botswana">Botswana</MenuItem>
                    <MenuItem value="Brazil">Brazil</MenuItem>
                    <MenuItem value="British Indian Ocean Ter">
                      British Indian Ocean Ter
                    </MenuItem>
                    <MenuItem value="Brunei">Brunei</MenuItem>
                    <MenuItem value="Bulgaria">Bulgaria</MenuItem>
                    <MenuItem value="Burkina Faso">Burkina Faso</MenuItem>
                    <MenuItem value="Burundi">Burundi</MenuItem>
                    <MenuItem value="Cambodia">Cambodia</MenuItem>
                    <MenuItem value="Cameroon">Cameroon</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="Canary Islands">Canary Islands</MenuItem>
                    <MenuItem value="Cape Verde">Cape Verde</MenuItem>
                    <MenuItem value="Cayman Islands">Cayman Islands</MenuItem>
                    <MenuItem value="Central African Republic">
                      Central African Republic
                    </MenuItem>
                    <MenuItem value="Chad">Chad</MenuItem>
                    <MenuItem value="Channel Islands">Channel Islands</MenuItem>
                    <MenuItem value="Chile">Chile</MenuItem>
                    <MenuItem value="China">China</MenuItem>
                    <MenuItem value="Christmas Island">
                      Christmas Island
                    </MenuItem>
                    <MenuItem value="Cocos Island">Cocos Island</MenuItem>
                    <MenuItem value="Colombia">Colombia</MenuItem>
                    <MenuItem value="Comoros">Comoros</MenuItem>
                    <MenuItem value="Congo">Congo</MenuItem>
                    <MenuItem value="Cook Islands">Cook Islands</MenuItem>
                    <MenuItem value="Costa Rica">Costa Rica</MenuItem>
                    <MenuItem value="Cote DIvoire">Cote DIvoire</MenuItem>
                    <MenuItem value="Croatia">Croatia</MenuItem>
                    <MenuItem value="Cuba">Cuba</MenuItem>
                    <MenuItem value="Curaco">Curacao</MenuItem>
                    <MenuItem value="Cyprus">Cyprus</MenuItem>
                    <MenuItem value="Czech Republic">Czech Republic</MenuItem>
                    <MenuItem value="Denmark">Denmark</MenuItem>
                    <MenuItem value="Djibouti">Djibouti</MenuItem>
                    <MenuItem value="Dominica">Dominica</MenuItem>
                    <MenuItem value="Dominican Republic">
                      Dominican Republic
                    </MenuItem>
                    <MenuItem value="East Timor">East Timor</MenuItem>
                    <MenuItem value="Ecuador">Ecuador</MenuItem>
                    <MenuItem value="Egypt">Egypt</MenuItem>
                    <MenuItem value="El Salvador">El Salvador</MenuItem>
                    <MenuItem value="Equatorial Guinea">
                      Equatorial Guinea
                    </MenuItem>
                    <MenuItem value="Eritrea">Eritrea</MenuItem>
                    <MenuItem value="Estonia">Estonia</MenuItem>
                    <MenuItem value="Ethiopia">Ethiopia</MenuItem>
                    <MenuItem value="Falkland Islands">
                      Falkland Islands
                    </MenuItem>
                    <MenuItem value="Faroe Islands">Faroe Islands</MenuItem>
                    <MenuItem value="Fiji">Fiji</MenuItem>
                    <MenuItem value="Finland">Finland</MenuItem>
                    <MenuItem value="France">France</MenuItem>
                    <MenuItem value="French Guiana">French Guiana</MenuItem>
                    <MenuItem value="French Polynesia">
                      French Polynesia
                    </MenuItem>
                    <MenuItem value="French Southern Ter">
                      French Southern Ter
                    </MenuItem>
                    <MenuItem value="Gabon">Gabon</MenuItem>
                    <MenuItem value="Gambia">Gambia</MenuItem>
                    <MenuItem value="Georgia">Georgia</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>
                    <MenuItem value="Ghana">Ghana</MenuItem>
                    <MenuItem value="Gibraltar">Gibraltar</MenuItem>
                    <MenuItem value="Great Britain">Great Britain</MenuItem>
                    <MenuItem value="Greece">Greece</MenuItem>
                    <MenuItem value="Greenland">Greenland</MenuItem>
                    <MenuItem value="Grenada">Grenada</MenuItem>
                    <MenuItem value="Guadeloupe">Guadeloupe</MenuItem>
                    <MenuItem value="Guam">Guam</MenuItem>
                    <MenuItem value="Guatemala">Guatemala</MenuItem>
                    <MenuItem value="Guinea">Guinea</MenuItem>
                    <MenuItem value="Guyana">Guyana</MenuItem>
                    <MenuItem value="Haiti">Haiti</MenuItem>
                    <MenuItem value="Hawaii">Hawaii</MenuItem>
                    <MenuItem value="Honduras">Honduras</MenuItem>
                    <MenuItem value="Hong Kong">Hong Kong</MenuItem>
                    <MenuItem value="Hungary">Hungary</MenuItem>
                    <MenuItem value="Iceland">Iceland</MenuItem>
                    <MenuItem value="Indonesia">Indonesia</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="Iran">Iran</MenuItem>
                    <MenuItem value="Iraq">Iraq</MenuItem>
                    <MenuItem value="Ireland">Ireland</MenuItem>
                    <MenuItem value="Isle of Man">Isle of Man</MenuItem>
                    <MenuItem value="Israel">Israel</MenuItem>
                    <MenuItem value="Italy">Italy</MenuItem>
                    <MenuItem value="Jamaica">Jamaica</MenuItem>
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="Jordan">Jordan</MenuItem>
                    <MenuItem value="Kazakhstan">Kazakhstan</MenuItem>
                    <MenuItem value="Kenya">Kenya</MenuItem>
                    <MenuItem value="Kiribati">Kiribati</MenuItem>
                    <MenuItem value="Korea North">Korea North</MenuItem>
                    <MenuItem value="Korea Sout">Korea South</MenuItem>
                    <MenuItem value="Kuwait">Kuwait</MenuItem>
                    <MenuItem value="Kyrgyzstan">Kyrgyzstan</MenuItem>
                    <MenuItem value="Laos">Laos</MenuItem>
                    <MenuItem value="Latvia">Latvia</MenuItem>
                    <MenuItem value="Lebanon">Lebanon</MenuItem>
                    <MenuItem value="Lesotho">Lesotho</MenuItem>
                    <MenuItem value="Liberia">Liberia</MenuItem>
                    <MenuItem value="Libya">Libya</MenuItem>
                    <MenuItem value="Liechtenstein">Liechtenstein</MenuItem>
                    <MenuItem value="Lithuania">Lithuania</MenuItem>
                    <MenuItem value="Luxembourg">Luxembourg</MenuItem>
                    <MenuItem value="Macau">Macau</MenuItem>
                    <MenuItem value="Macedonia">Macedonia</MenuItem>
                    <MenuItem value="Madagascar">Madagascar</MenuItem>
                    <MenuItem value="Malaysia">Malaysia</MenuItem>
                    <MenuItem value="Malawi">Malawi</MenuItem>
                    <MenuItem value="Maldives">Maldives</MenuItem>
                    <MenuItem value="Mali">Mali</MenuItem>
                    <MenuItem value="Malta">Malta</MenuItem>
                    <MenuItem value="Marshall Islands">
                      Marshall Islands
                    </MenuItem>
                    <MenuItem value="Martinique">Martinique</MenuItem>
                    <MenuItem value="Mauritania">Mauritania</MenuItem>
                    <MenuItem value="Mauritius">Mauritius</MenuItem>
                    <MenuItem value="Mayotte">Mayotte</MenuItem>
                    <MenuItem value="Mexico">Mexico</MenuItem>
                    <MenuItem value="Midway Islands">Midway Islands</MenuItem>
                    <MenuItem value="Moldova">Moldova</MenuItem>
                    <MenuItem value="Monaco">Monaco</MenuItem>
                    <MenuItem value="Mongolia">Mongolia</MenuItem>
                    <MenuItem value="Montserrat">Montserrat</MenuItem>
                    <MenuItem value="Morocco">Morocco</MenuItem>
                    <MenuItem value="Mozambique">Mozambique</MenuItem>
                    <MenuItem value="Myanmar">Myanmar</MenuItem>
                    <MenuItem value="Nambia">Nambia</MenuItem>
                    <MenuItem value="Nauru">Nauru</MenuItem>
                    <MenuItem value="Nepal">Nepal</MenuItem>
                    <MenuItem value="Netherland Antilles">
                      Netherland Antilles
                    </MenuItem>
                    <MenuItem value="Netherlands">
                      Netherlands (Holland, Europe)
                    </MenuItem>
                    <MenuItem value="Nevis">Nevis</MenuItem>
                    <MenuItem value="New Caledonia">New Caledonia</MenuItem>
                    <MenuItem value="New Zealand">New Zealand</MenuItem>
                    <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                    <MenuItem value="Niger">Niger</MenuItem>
                    <MenuItem value="Nigeria">Nigeria</MenuItem>
                    <MenuItem value="Niue">Niue</MenuItem>
                    <MenuItem value="Norfolk Island">Norfolk Island</MenuItem>
                    <MenuItem value="Norway">Norway</MenuItem>
                    <MenuItem value="Oman">Oman</MenuItem>
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="Palau Island">Palau Island</MenuItem>
                    <MenuItem value="Palestine">Palestine</MenuItem>
                    <MenuItem value="Panama">Panama</MenuItem>
                    <MenuItem value="Papua New Guinea">
                      Papua New Guinea
                    </MenuItem>
                    <MenuItem value="Paraguay">Paraguay</MenuItem>
                    <MenuItem value="Peru">Peru</MenuItem>
                    <MenuItem value="Phillipines">Philippines</MenuItem>
                    <MenuItem value="Pitcairn Island">Pitcairn Island</MenuItem>
                    <MenuItem value="Poland">Poland</MenuItem>
                    <MenuItem value="Portugal">Portugal</MenuItem>
                    <MenuItem value="Puerto Rico">Puerto Rico</MenuItem>
                    <MenuItem value="Qatar">Qatar</MenuItem>
                    <MenuItem value="Republic of Montenegro">
                      Republic of Montenegro
                    </MenuItem>
                    <MenuItem value="Republic of Serbia">
                      Republic of Serbia
                    </MenuItem>
                    <MenuItem value="Reunion">Reunion</MenuItem>
                    <MenuItem value="Romania">Romania</MenuItem>
                    <MenuItem value="Russia">Russia</MenuItem>
                    <MenuItem value="Rwanda">Rwanda</MenuItem>
                    <MenuItem value="St Barthelemy">St Barthelemy</MenuItem>
                    <MenuItem value="St Eustatius">St Eustatius</MenuItem>
                    <MenuItem value="St Helena">St Helena</MenuItem>
                    <MenuItem value="St Kitts-Nevis">St Kitts-Nevis</MenuItem>
                    <MenuItem value="St Lucia">St Lucia</MenuItem>
                    <MenuItem value="St Maarten">St Maarten</MenuItem>
                    <MenuItem value="St Pierre & Miquelon">
                      St Pierre & Miquelon
                    </MenuItem>
                    <MenuItem value="St Vincent & Grenadines">
                      St Vincent & Grenadines
                    </MenuItem>
                    <MenuItem value="Saipan">Saipan</MenuItem>
                    <MenuItem value="Samoa">Samoa</MenuItem>
                    <MenuItem value="Samoa American">Samoa American</MenuItem>
                    <MenuItem value="San Marino">San Marino</MenuItem>
                    <MenuItem value="Sao Tome & Principe">
                      Sao Tome & Principe
                    </MenuItem>
                    <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                    <MenuItem value="Senegal">Senegal</MenuItem>
                    <MenuItem value="Seychelles">Seychelles</MenuItem>
                    <MenuItem value="Sierra Leone">Sierra Leone</MenuItem>
                    <MenuItem value="Singapore">Singapore</MenuItem>
                    <MenuItem value="Slovakia">Slovakia</MenuItem>
                    <MenuItem value="Slovenia">Slovenia</MenuItem>
                    <MenuItem value="Solomon Islands">Solomon Islands</MenuItem>
                    <MenuItem value="Somalia">Somalia</MenuItem>
                    <MenuItem value="South Africa">South Africa</MenuItem>
                    <MenuItem value="Spain">Spain</MenuItem>
                    <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                    <MenuItem value="Sudan">Sudan</MenuItem>
                    <MenuItem value="Suriname">Suriname</MenuItem>
                    <MenuItem value="Swaziland">Swaziland</MenuItem>
                    <MenuItem value="Sweden">Sweden</MenuItem>
                    <MenuItem value="Switzerland">Switzerland</MenuItem>
                    <MenuItem value="Syria">Syria</MenuItem>
                    <MenuItem value="Tahiti">Tahiti</MenuItem>
                    <MenuItem value="Taiwan">Taiwan</MenuItem>
                    <MenuItem value="Tajikistan">Tajikistan</MenuItem>
                    <MenuItem value="Tanzania">Tanzania</MenuItem>
                    <MenuItem value="Thailand">Thailand</MenuItem>
                    <MenuItem value="Togo">Togo</MenuItem>
                    <MenuItem value="Tokelau">Tokelau</MenuItem>
                    <MenuItem value="Tonga">Tonga</MenuItem>
                    <MenuItem value="Trinidad & Tobago">
                      Trinidad & Tobago
                    </MenuItem>
                    <MenuItem value="Tunisia">Tunisia</MenuItem>
                    <MenuItem value="Turkey">Turkey</MenuItem>
                    <MenuItem value="Turkmenistan">Turkmenistan</MenuItem>
                    <MenuItem value="Turks & Caicos Is">
                      Turks & Caicos Is
                    </MenuItem>
                    <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                    <MenuItem value="Uganda">Uganda</MenuItem>
                    <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                    <MenuItem value="Ukraine">Ukraine</MenuItem>
                    <MenuItem value="United Arab Erimates">
                      United Arab Emirates
                    </MenuItem>
                    <MenuItem value="United States of America">
                      United States of America
                    </MenuItem>
                    <MenuItem value="Uraguay">Uruguay</MenuItem>
                    <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                    <MenuItem value="Vanuatu">Vanuatu</MenuItem>
                    <MenuItem value="Vatican City State">
                      Vatican City State
                    </MenuItem>
                    <MenuItem value="Venezuela">Venezuela</MenuItem>
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                    <MenuItem value="Virgin Islands (Brit)">
                      Virgin Islands (Brit)
                    </MenuItem>
                    <MenuItem value="Virgin Islands (USA)">
                      Virgin Islands (USA)
                    </MenuItem>
                    <MenuItem value="Wake Island">Wake Island</MenuItem>
                    <MenuItem value="Wallis & Futana Is">
                      Wallis & Futana Is
                    </MenuItem>
                    <MenuItem value="Yemen">Yemen</MenuItem>
                    <MenuItem value="Zaire">Zaire</MenuItem>
                    <MenuItem value="Zambia">Zambia</MenuItem>
                    <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="coupon"
                    label="Coupon"
                    name="coupon"
                    onChange={e => setCoupon(e.target.value)}
                    autoComplete="coupon"
                  />
                </Grid>
                {couponApplied && (
                  <Grid>
                    <Snackbar
                      autoHideDuration={6000}
                      open={open}
                      onClose={() => {
                        setOpen(false)
                      }}
                      message={
                        'Coupon Applied.Now the course price is ' +
                        priceAfterCoupon
                      }
                    />
                  </Grid>
                )}
                {isCouponNotApplied && !couponApplied && (
                  <Grid>
                    <Snackbar
                      autoHideDuration={6000}
                      open={open}
                      onClose={() => {
                        setOpen(false)
                      }}
                      message={'Coupon not applied'}
                    />
                  </Grid>
                )}
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleCoupon.bind(this)}
              >
                Apply Coupon Code
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // color="primary"
                style={{ background: '#61C1E6', color: 'white' }}
                className={classes.submit}
              >
                Pay {appliedCoupon ? priceAfterCoupon : actualPrice}
              </Button>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </MenuStructure>
    </Layout>
  )
}
