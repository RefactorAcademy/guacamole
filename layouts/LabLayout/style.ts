import styled from 'styled-components'
import { Button, LinearProgress } from '@material-ui/core'

export const LabTitle = styled.div`
  margin-bottom: 25px;
  font-size: 3rem;
  line-height: 3rem;
`

export const LabCaption = styled.div`
  margin-bottom: 30px;
  line-height: 1.5rem;
`

export const LabDetails = styled.div`
  margin-bottom: 20px;
  border-radius: 10px;
`

export const LabDetailHeader = styled.div`
  min-height: 50px;
  border: 1px solid #35c1e6;
  border-radius: 10px 10px 0px 0px;
  background: #35c1e6;
  color: white;
  padding: 15px;
  display: flex;
  align-items: flex-end;

  span {
    font-weight: 700;
  }
`

export const LabDetailContents = styled.div`
  padding: 25px;
  border-left: 1px solid #35c1e6;
  border-right: 1px solid #35c1e6;
  border-bottom: 1px solid #35c1e6;
  border-radius: 0 0 10px 10px;
`

export const LabDetailItem = styled.div`
  .detail-val.val-em {
    font-weight: 700;
  }

  .detail-key {
    font-weight: 700;
    margin-right: 5px;
  }

  .state-positive {
    color: green;
  }

  .state-negative {
    color: red;
  }
`

export const LabActions = styled.div`
  margin-bottom: 20px;
  border-left: 1px solid #35c1e6;
  border-right: 1px solid #35c1e6;
  border-bottom: 1px solid #35c1e6;
  border-radius: 10px;
`

export const LabActionHeader = styled.div`
  padding: 15px;
  background: #35c1e6;
  min-height: 50px;
  color: white;
  border-radius: 10px 10px 0 0;

  span {
    font-weight: 700;
  }
`

export const LabActionButtons = styled.div`
  padding: 25px;

  .in-progress-msg {
    margin-bottom: 10px;
  }
`

export const LabPerformButtons = styled.div``

export const ActionButton = styled(Button)`
  margin-right: 10px !important;

  &.btn-positive {
    background-color: #8bc34a;
    color: white;

    &:hover {
      background-color: #689f38;
    }
  }

  &.btn-negative {
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.26) !important;
    background-color: rgba(0, 0, 0, 0.12) !important;
  }
`

export const LabStateMsg = styled.div`
  span {
    font-size: 1rem;
    line-height: 1rem;
  }
`

export const LabUrl = styled.div`
  padding: 25px;
  border-top: 1px solid #35c1e6;

  .detail-key {
    font-weight: 700;
    margin-right: 5px;
    margin-bottom: 10px;
  }

  .btn-neutral {
    background-color: #2196f3;
    color: white;

    &:hover {
      background-color: #1976d2;
    }
  }

  .lab-url-link {
    word-break: break-word;
  }

  .lab-url-btn {
    margin-bottom: 10px;

    > div {
      display: inline-block;
      margin-right: 7px;
    }
  }
`

export const LabCredentials = styled.div`
  padding: 25px;
  border-top: 1px solid #35c1e6;

  .detail-key {
    font-weight: 700;
    margin-right: 5px;
    margin-bottom: 10px;
  }

  .lab-credentials {
    word-break: break-word;

    .lab-show-pass-btn {
      color: #1186a5;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export const LabLoader = styled(LinearProgress)`
  background-color: #b6f0ff !important;

  div {
    background: #35c1e6 !important;
  }
`
