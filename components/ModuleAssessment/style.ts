import styled, { css } from 'styled-components'
import { Button, Form } from 'grommet'

export const AssessmnentWrapper = styled.div`
  margin-bottom: 20px;
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: table;
    width: 100%;
  }
`

export const Label = styled.div`
  width: calc(100% - 30px);
  margin-left: 10px;
`

interface QuestionProps {
  isCorrect: boolean
  assessmentAttempted: number
  theme: any
  dangerouslySetInnerHTML: any
}

interface ScoreProps {
  passed: boolean
  theme: any
}

interface AssessmentProps {
  attemptedSubmit: boolean
  theme: any
}

export const QuestionLabel = styled.p`
  font-weight: bold;
  ${(props: QuestionProps) => {
    if (props.assessmentAttempted) {
      return css`
        color: ${props.isCorrect
          ? props.theme.palette.green100
          : props.theme.palette.danger90};
      `
    }
    return null
  }}
`

export const Score = styled.div`
  color: ${({ theme }) => theme.colors.lightColor};
  background: ${({ theme }) => theme.palette.blueGray60};
  text-align: center;
  h5 {
    padding: 10px;
    margin: 0;
    font-size: 12px;
    font-weight: bold;
    background: ${(props: ScoreProps) =>
      props.passed
        ? props.theme.palette.green100
        : props.theme.palette.danger90};
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightColor};
  }
  h4 {
    font-weight: bold;
    font-size: 24px;
    margin: 0;
    padding: 10px 15px;
    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
`

const Wrapper = css`
  padding: 20px;
  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
  }
  & > p:first-child {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: table-cell;
    width: 50%;
    vertical-align: top;
  }
`

export const Question = styled.div`
  background-color: ${({ theme }) => theme.palette.info10};
  ${Wrapper}
`

export const Choices = styled.div`
  background-color: ${({ theme }) => theme.palette.info20};
  ${Wrapper}
`

export const AssessmentWarning = styled.div`
  color: ${({ theme }) => theme.colors.lightColor};
  margin-bottom: 20px;
  display: table;
  width: 100%;
  & > div {
    background: ${(props: AssessmentProps) =>
      props.attemptedSubmit
        ? props.theme.palette.danger80
        : props.theme.palette.warning80};
    padding: 20px;
    display: table-cell;
    vertical-align: middle;
    font-weight: bold;
  }
  & > div:first-child {
    background: ${(props: AssessmentProps) =>
      props.attemptedSubmit
        ? props.theme.palette.danger100
        : props.theme.palette.warning100};
    width: 26px;
  }
`

export const DisabledForm = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(255, 255, 255, 0.6);
`

export const StyledForm = styled(Form)`
  position: relative;
`

export const StyledButton = styled(Button)`
  background-color: #35d635;
  color: white;
`
