import { Box, RadioButton, Heading, Button } from 'grommet'
import { StatusWarning } from 'grommet-icons'
import * as React from 'react'
import { Assessment } from '../../interfaces'
import { CircularProgress, IconButton, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { callAPI, checkInitialResponse } from '../../utilities'
import {
  AssessmnentWrapper,
  Question,
  Choices,
  Label,
  Score,
  QuestionLabel,
  AssessmentWarning,
  DisabledForm,
  StyledForm,
  StyledButton,
} from './style'
import decodeHtml from 'decode-html'
import { ENDPOINTS } from '../../constants'

type AssessmentProps = {
  assessment: Assessment[]
  submittedAnswers: Assessment[]
  assessmentAttempted: number
  previousAssessmentCompleted: boolean
  score: number
  id: string
  moduleId: string
  isComprehensive: boolean
}

type AssessmentState = {
  answers: (string | number)[]
  isCorrectArray: {}
  showWarning: {}
  attemptedSubmit: boolean
  isSubmitting: boolean
  isError: boolean
  showError: boolean
  errorMsg: string
}

class ModuleAssessment extends React.Component<
  AssessmentProps,
  AssessmentState
> {
  state: AssessmentState = {
    // optional second annotation for better type inference
    answers: [0],
    isCorrectArray: {},
    showWarning: {},
    attemptedSubmit: false,
    isSubmitting: false,
    isError: true,
    showError: true,
    errorMsg: '',
  }

  constructor(props) {
    super(props)
    const formedAnswers = this.formAssessmetAnswers(
      props.submittedAnswers,
      props.assessmentAttempted
    )
    this.state = {
      answers: formedAnswers.answers,
      isCorrectArray: formedAnswers.isCorrectArray,
      showWarning: false,
      attemptedSubmit: false,
      isSubmitting: false,
      isError: false,
      showError: false,
      errorMsg: '',
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ANSWER = e.target.value.split('::')
    const answers = this.state.answers || [0]

    answers[ANSWER[0]] = parseInt(ANSWER[1], 0)
    this.setState({
      answers,
    })
  }

  checkResponse = response => {
    let res = checkInitialResponse(response)

    if (res.error) {
      this.setState({
        isSubmitting: false,
        isError: !!res.error,
        showError: !!res.error,
        errorMsg: res.status,
      })
    }

    return (res.error && res.error) || res
  }

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    // do not submit when previous assessment is not yet answered

    this.setState({ isSubmitting: true })

    let email = localStorage.getItem('userName')
    let courseId = localStorage.getItem('courseId')
    let moduleId = this.props.moduleId
    // let courseId
    let endpoint = `https://accounts.traklabs.io/course/${email}/${courseId}/${moduleId}/assessment`
    // ENDPOINTS.APP_ASSESSMENT(email,courseId, this.props.moduleId)

    if (!this.props.moduleId || this.props.moduleId === 0) {
      endpoint = ENDPOINTS.APP_COMPREHENSIVE(this.props.id)
    }

    fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(this.formAnswerData(this.state.answers)),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tkz'),
      },
    }).then(res => {
      window.location.reload()
      console.log(res.json())
    })

    // callAPI(endpoint, JSON.stringify(this.formAnswerData(this.state.answers)), {
    //   name: 'Content-Type',
    //   value: 'application/json',
    // })
    //   .then(res => res)
    //   .then(r => {
    //     // window.location.reload()
    //     //return r.json()
    //   })
  }

  formAnswerData(answers = []) {
    // do not use index 0
    const answerData = { data: [] }
    answers.map((answer, i) => {
      i &&
        answerData.data.push({
          answer,
          index: i,
        })
    })
    return answerData
  }

  formAssessmetAnswers(submittedAnswers, assessmentAttempted) {
    const answers = [0]
    const isCorrectArray = [0]
    if (
      assessmentAttempted > 0 &&
      submittedAnswers &&
      submittedAnswers.length
    ) {
      submittedAnswers.map(ans => {
        answers[ans.question_no] = parseInt(ans.user_response, 10)
        isCorrectArray[ans.question_no] = ans.isCorrect
      })
    }
    return {
      answers,
      isCorrectArray,
    }
  }

  confirmSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    this.setState({ attemptedSubmit: true })
  }

  render() {
    const {
      assessment,
      assessmentAttempted,
      score,
      previousAssessmentCompleted,
    } = this.props

    let { attemptedSubmit, isSubmitting, showError, errorMsg } = this.state

    return (
      <Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={showError}
          autoHideDuration={5000}
          onClose={() => this.setState({ showError: !showError })}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id">
              Error:{' '}
              {(errorMsg && errorMsg) || 'An error occurred. Please try again.'}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => this.setState({ showError: !showError })}
            >
              <Close />
            </IconButton>,
          ]}
        />
        <Box pad="small">
          {(!this.props.isComprehensive && (
            <div>
              <Heading level="3"> Module Assessment </Heading>
            </div>
          )) ||
            null}
          {!previousAssessmentCompleted && (
            <AssessmentWarning>
              <div>
                <StatusWarning size="medium" color="brand" />
              </div>
              <div>
                Please answer previous module's assessment to activate
                assessment submission in this module.
              </div>
            </AssessmentWarning>
          )}
          <StyledForm
            onSubmit={attemptedSubmit ? this.onSubmit : this.confirmSubmit}
          >
            {assessment.map((questionItem, count) => {
              const isCorrect =
                assessmentAttempted &&
                this.state.isCorrectArray[questionItem.index]

              return (
                <AssessmnentWrapper key={count}>
                  <Question>
                    <p>Question {count + 1}</p>
                    <QuestionLabel
                      assessmentAttempted={assessmentAttempted}
                      isCorrect={isCorrect}
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(questionItem.question),
                      }}
                    />
                  </Question>
                  <Choices>
                    <p>Choices</p>
                    <fieldset>
                      {questionItem.choices.map(choice => {
                        const label = (
                          <Label
                            style={{ width: 'calc(100% - 40px)' }}
                            dangerouslySetInnerHTML={{
                              __html: decodeHtml(choice.choice),
                            }}
                          />
                        )
                        return (
                          <Box
                            key={`${questionItem.index}_choice_${choice.index}`}
                            pad={{ vertical: 'xsmall' }}
                          >
                            <RadioButton
                              id={`${questionItem.index}::${choice.index}`}
                              label={label}
                              disabled={assessmentAttempted > 0}
                              name={`questionItem_${questionItem.index}`}
                              value={`${questionItem.index}::${choice.index}`}
                              checked={
                                this.state.answers &&
                                this.state.answers[questionItem.index] ===
                                  choice.index
                              }
                              required
                              onChange={this.handleChange}
                            />
                          </Box>
                        )
                      })}
                    </fieldset>
                  </Choices>
                </AssessmnentWrapper>
              )
            })}
            {!assessmentAttempted && (
              <>
                {(this.state.attemptedSubmit && (
                  <AssessmentWarning attemptedSubmit={true}>
                    <div>
                      <StatusWarning size="medium" color="brand" />
                    </div>
                    <div>
                      Please review responses. Submitted answers will be
                      considered as final as assessments are automatically
                      graded. There is <b>NO RESUBMISSION</b> of answers.
                    </div>
                  </AssessmentWarning>
                )) || (
                  <AssessmentWarning attemptedSubmit={false}>
                    <div>
                      <StatusWarning size="medium" color="brand" />
                    </div>
                    <div>
                      All answers to the questions are required to submit the
                      assessment.
                    </div>
                  </AssessmentWarning>
                )}
                <StyledButton
                  style={{ float: 'right' }}
                  type={'submit'}
                  primary
                  label={attemptedSubmit ? 'Review Done. Submit Now' : 'Submit'}
                  disabled={!previousAssessmentCompleted || isSubmitting}
                />
                {(isSubmitting && (
                  <div style={{ float: 'right', padding: '5px 10px 0 0' }}>
                    <CircularProgress size={20} />
                  </div>
                )) ||
                  null}
              </>
            )}
            {!previousAssessmentCompleted && <DisabledForm />}
          </StyledForm>
        </Box>
        {assessmentAttempted !== 0 ? (
          <Box pad="small" align="end">
            <Score passed={score > 49}>
              <Heading level="5">ASSESSMENT SCORE</Heading>
              <Heading level="4">
                {score}
                <span>%</span>
              </Heading>
            </Score>
          </Box>
        ) : null}
      </Box>
    )
  }
}

export default ModuleAssessment
