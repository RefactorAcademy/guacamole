import * as React from 'react'
import { LabPage } from '../../interfaces'
import {
  ActionButton,
  LabTitle,
  LabCaption,
  LabDetails,
  LabDetailHeader,
  LabDetailContents,
  LabDetailItem,
  LabActions,
  LabActionHeader,
  LabActionButtons,
  LabPerformButtons,
  LabStateMsg,
  LabUrl,
  LabLoader,
  LabCredentials,
} from './style'
import Loader from '../../components/Loader'
import ResponseError from '../../components/ResponseError'
import { ERROR_MSGS } from '../../constants'
import { CircularProgress, Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const LabLayout: React.FunctionComponent<LabPage> = ({
  isLoading,
  courseInfo,
  isPerforming,
  isError,
  isLabCreated,
  isLabStarted,
  isLabInProgress,
  isPending,
  isDeleted,
  isEnrolled,
  isAITool,
  isIOT,
  isBigData,
  labInfo,
  showError,
  errorMsg,
  userInfo,
  labPerform,
  toggleErrorDisplay,
  backFn,
  passwordShown,
  showPassword,
}) => {
  console.log("labInfo", labInfo)
  return (
    <div className={'content-page-layout'}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={showError}
        autoHideDuration={5000}
        onClose={toggleErrorDisplay}
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
            onClick={toggleErrorDisplay}
          >
            <Close />
          </IconButton>,
        ]}
      />
      <div className={'page-header'} />
      {(isLoading && <Loader />) || null}

      {(!isLoading && !isEnrolled && (
        <ResponseError
          backFn={backFn}
          titleMsg={ERROR_MSGS.USER_NOT_ENROLLED.title}
          bodyMsg={ERROR_MSGS.USER_NOT_ENROLLED.body}
        />
      )) ||
        null}

      {(!isLoading && isDeleted && (
        <ResponseError
          backFn={backFn}
          titleMsg={ERROR_MSGS.LAB_EXPIRED.title}
          bodyMsg={ERROR_MSGS.LAB_EXPIRED.body}
        />
      )) ||
        null}

      {!isError && isEnrolled && !isDeleted && (
        <div
          className={`page-content ${
            !isLoading ? 'content-show' : 'content-hide'
          }`}
        >
          {!isLoading && !isPending && (
            <>
              <LabTitle>
                <span>
                  Welcome to your {courseInfo.courseName} Lab
                </span>
              </LabTitle>
              <LabCaption>
                <p>
                  This is your lab on the cloud. Please click on the start
                  button to start your lab everytime you are ready to use the
                  lab machine. Do not forget to save your codebase and you can
                  download the same to keep them in your github repository.
                  Lastly, whenever you are not using the lab, please click on
                  the stop button to save usage as the number of hours given to
                  you is limited.
                  <br />
                  All the best!
                  <br />
                  For any help please write to us at{' '}
                  <a href="mailto:support@trakinvest.com">
                    support@trakinvest.com
                  </a>
                </p>
              </LabCaption>
              <div className={'lab-body'}>
                <LabDetails>
                    <LabDetailHeader>
                      <span>Lab Details</span>
                    </LabDetailHeader>
                    <LabDetailContents>
                      <LabDetailItem>
                        <span className={'detail-key'}>Email ID:</span>
                        <span>{localStorage.getItem('userName')}</span>
                      </LabDetailItem>
                      <LabDetailItem>
                        <span className={'detail-key'}>Account State:</span>
                        <span
                          // className={`detail-val val-em ${
                          //   labInfo.state === 'Active'
                          //     ? 'state-positive'
                          //     : 'state-negative'
                          // }`}

                          className={`detail-val val-em ${
                               'state-positive'
                          }`}
                          
                        >
                          {/* {labInfo.state} */}
                          {/* HARD CODED */}
                          Active
                        </span>
                      </LabDetailItem>
                    </LabDetailContents>
                </LabDetails>
                    

                <LabActions>
                  <LabActionHeader>
                    <span>Perform Actions</span>
                  </LabActionHeader>
                  <LabActionButtons className={'action-btns'}>
                  {(isLabInProgress && (
                          <>
                            <div className={'in-progress-msg'}>
                              <span>
                                Your lab is currently being processed. Please
                                bear with us while waiting.
                              </span>
                            </div>
                            <LabLoader color={'primary'} />
                          </>
                        )) ||
                  null}
                  {(!isLabInProgress && (
                          <LabPerformButtons>
                            <ActionButton
                              className={'action-btn btn-positive'}
                              variant="contained"
                              size="large"
                              disabled={isLabStarted || isPerforming}
                              onClick={() => labPerform('Start')}
                            >
                              Start
                            </ActionButton>
                            <ActionButton
                              className={'action-btn btn-negative'}
                              variant="contained"
                              size="large"
                              disabled={!isLabStarted || isPerforming}
                              onClick={() => labPerform('Stop')}
                            >
                              Stop
                            </ActionButton>
                            {isPerforming && (
                              <div style={{ display: 'inline-block' }}>
                                <CircularProgress size={20} />
                              </div>
                            )}
                          </LabPerformButtons>
                        )) ||
                  null}
                  </LabActionButtons>

                  <LabUrl className={'lab-url'}>
                    <div className={'detail-key'}>
                      Access the lab here:
                    </div>

                    <div className={'lab-url-btn'}>
                      {
                        labInfo.map((connection) => {
                          return <div>
                                  <ActionButton
                                    className={'btn-neutral'}
                                    variant="contained"
                                    size="large"
                                    onClick={() =>
                                      window.open(connection.uri, '_blank')
                                    }
                                  >
                                    Open {connection.type}
                                  </ActionButton>
                                </div>
                        })
                      }
                    </div>
                  </LabUrl>
                </LabActions>
              </div>
              {/* {isLabCreated && !isPending && (
                <div className={'lab-body'}>
                  <LabDetails>
                    <LabDetailHeader>
                      <span>Lab Details</span>
                    </LabDetailHeader>
                    <LabDetailContents>
                      <LabDetailItem>
                        <span className={'detail-key'}>Email ID:</span>
                        <span>{localStorage.getItem('userName')}</span>
                      </LabDetailItem>
                      <LabDetailItem>
                        <span className={'detail-key'}>Account State:</span>
                        <span
                          className={`detail-val val-em ${
                            labInfo.state === 'Active'
                              ? 'state-positive'
                              : 'state-negative'
                          }`}
                        >
                          {labInfo.state}
                        </span>
                      </LabDetailItem>
                    </LabDetailContents>
                  </LabDetails>
                  <LabActions>
                    <LabActionHeader>
                      <span>Perform Actions</span>
                    </LabActionHeader>
                    {labInfo.name !== 'Big Data - Lab' && (
                      <LabActionButtons className={'action-btns'}>
                        {(isLabInProgress && (
                          <>
                            <div className={'in-progress-msg'}>
                              <span>
                                Your lab is currently being processed. Please
                                bear with us while waiting.
                              </span>
                            </div>
                            <LabLoader color={'primary'} />
                          </>
                        )) ||
                          null}
                        {(!isLabInProgress && (
                          <LabPerformButtons>
                            <ActionButton
                              className={'action-btn btn-positive'}
                              variant="contained"
                              size="large"
                              disabled={isLabStarted || isPerforming}
                              onClick={() => labPerform('Start')}
                            >
                              Start
                            </ActionButton>
                            <ActionButton
                              className={'action-btn btn-negative'}
                              variant="contained"
                              size="large"
                              disabled={!isLabStarted || isPerforming}
                              onClick={() => labPerform('Stop')}
                            >
                              Stop
                            </ActionButton>
                            {isPerforming && (
                              <div style={{ display: 'inline-block' }}>
                                <CircularProgress size={20} />
                              </div>
                            )}
                          </LabPerformButtons>
                        )) ||
                          null}
                      </LabActionButtons>
                    )}

                    {!isLabInProgress &&
                      labInfo.access.length > 0 &&
                      isLabStarted &&
                      !isPerforming && (
                        <>
                          <LabUrl className={'lab-url'}>
                            <div className={'detail-key'}>
                              Access the lab here:
                            </div>
                            <div className={'lab-url-btn'}>
                              {labInfo.access.map(lab => (
                                <div>
                                  <ActionButton
                                    className={'btn-neutral'}
                                    variant="contained"
                                    size="large"
                                    onClick={() =>
                                      window.open(lab.value, '_blank')
                                    }
                                  >
                                    Open {lab.description}
                                  </ActionButton>
                                </div>
                              )) || (
                                <ActionButton
                                  className={'btn-neutral'}
                                  variant="contained"
                                  size="large"
                                  onClick={() =>
                                    window.open(lab.value, '_blank')
                                  }
                                >
                                  Open Lab
                                </ActionButton>
                              )}
                            </div>
                            <div className={'details-item'}>
                              <div className={'detail-key'}>Or here:</div>
                              <span className={'lab-url-link'}>
                                {labInfo.access.map(lab => (
                                  <div>
                                    <span>{lab.description}: </span>
                                    <a href={lab.value} target="_blank">
                                      {lab.value}
                                    </a>
                                  </div>
                                ))}
                              </span>
                            </div>
                          </LabUrl>
                          {(labInfo.name === 'Big Data - Lab' && (
                            <LabCredentials>
                              <div className={'detail-key'}>
                                Credentials For Login:
                              </div>
                              <span className={'lab-credentials'}>
                                <div>
                                  <span>Username: </span>
                                  <span>{labInfo.credentials.userName}</span>
                                </div>
                                <div>
                                  <span>Password: </span>
                                  {(passwordShown && (
                                    <span>{labInfo.credentials.passWord}</span>
                                  )) || (
                                    <span
                                      className={'lab-show-pass-btn'}
                                      onClick={() => showPassword()}
                                    >
                                      Show Password
                                    </span>
                                  )}
                                </div>
                              </span>
                            </LabCredentials>
                          )) ||
                            null}
                        </>
                      )}
                  </LabActions>
                </div>
              )} */}
            </>
          )}
        </div>
      )}
      {isPending && (
        <LabStateMsg>
          <span>
            Your subscription is still being created. Please try again later.
          </span>
        </LabStateMsg>
      )}
    </div>
  )
}

export default LabLayout
