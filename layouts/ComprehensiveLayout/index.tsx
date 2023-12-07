import { DocumentTransfer } from 'grommet-icons'
import * as React from 'react'
import { Heading, Box } from 'grommet'
import { CourseAssessment } from '../../interfaces'
import decodeHtml from 'decode-html'
import Link from 'next/link'
import ModuleAssessment from '../../components/ModuleAssessment'
import ModuleVideoPlayer from '../../components/ModuleVideoPlayer'
import ModuleSummary from '../ModuleSummary'
import BorderedHeading from '../../components/BorderedHeading'
import {
  MainGrid,
  Sidebar,
  MainBody,
  StyledLink,
  Anchor,
  SidebarChapter,
  StyledButton,
  SidebarMainBox,
} from './style'
import Scroll from 'react-scroll'

const AnchorSection = Scroll.Element

const ComprehensiveLayout: React.FunctionComponent<CourseAssessment> = ({
  course,
  comprehensive,
  moduleId,
  id,
}) => {
  if (!comprehensive || !comprehensive.courseId) {
    return (
      <Box pad="small">
        <Heading level="3"> No access </Heading>
      </Box>
    )
  }

  // Do not show reports yet
  let nextModule = parseInt(moduleId, 10) + 1
  let nextPath = `/module`
  let nextLink = `/courses/${nextModule}`
  if (parseInt(moduleId, 10) === course.modules.length) {
    nextModule = 1
    nextPath = `/reports`
    nextLink = `/courses/reports`
  }
  const chapters: React.ReactNode[] = []

  return (
    <MainGrid>
      <MainBody animation="zoomIn" pad="medium">
        <Box direction="row">
          <Box align="stretch" pad="small">
            <Heading
              level="2"
              margin={{
                top: 'none',
                bottom: 'medium',
              }}
            >
              Comprehensive Assessment
            </Heading>
          </Box>
        </Box>
        {comprehensive.comprehensive_QP.assessment &&
        comprehensive.comprehensive_QP.assessment.length ? (
          <ModuleAssessment
            id={id}
            moduleId={0}
            isComprehensive={true}
            assessment={comprehensive.comprehensive_QP.assessment}
            submittedAnswers={
              (comprehensive.assessment && comprehensive.assessment) || []
            }
            assessmentAttempted={comprehensive.assessment_attempts}
            score={comprehensive.comprehensive_exam_percentage}
            previousAssessmentCompleted={
              comprehensive.progressData[9] &&
              comprehensive.progressData[9].assessment_completed
            }
          />
        ) : null}
        <Box direction="row" justify="end" pad="small">
          <Link
            href={{
              pathname: '/reports',
              query: {
                id,
              },
            }}
            as={`/courses/reports`}
          >
            <StyledButton
              icon={<DocumentTransfer size="small" color="brand" />}
              label="Go To Reports"
              primary
            />
          </Link>
        </Box>
      </MainBody>
      <Sidebar>
        <SidebarMainBox>
          <Box>
            <Box direction="row">
              <Link
                href={{
                  pathname: '/courses',
                  query: {
                    id,
                  },
                }}
                as={`/courses`}
              >
                <StyledLink>
                  {' '}
                  <span>Home</span> Course Summary{' '}
                </StyledLink>
              </Link>
            </Box>
          </Box>
          {course.modules.map(chapterModule => {
            const chapterModuleId = chapterModule.id.split('module::').pop()
            let isActive = chapterModuleId === moduleId ? true : false

            return (
              <Box key={chapterModule.id}>
                <Box direction="row">
                  <Link
                    href={{
                      pathname: '/module',
                      query: {
                        moduleId: chapterModuleId,
                        id: 4,
                      },
                    }}
                    as={`/courses/${chapterModuleId}`}
                  >
                    <StyledLink isActive={isActive}>
                      {' '}
                      <span>Module {chapterModuleId}</span>
                      {chapterModule.title}
                    </StyledLink>
                  </Link>
                </Box>
                {chapterModule.id === module.id && (
                  <SidebarChapter direction="column">{chapters}</SidebarChapter>
                )}
              </Box>
            )
          })}
          <Box>
            <Box direction="row">
              <Link
                href={{
                  pathname: '/module',
                  query: {
                    id,
                  },
                }}
                as={`/courses/assessment`}
              >
                <StyledLink isActive={true}>
                  {' '}
                  <span>Comprehensive</span> Assessment{' '}
                </StyledLink>
              </Link>
            </Box>
          </Box>
          <Box>
            <Box direction="row">
              <Link
                href={{
                  pathname: '/reports',
                  query: {
                    id,
                  },
                }}
                as={`/courses/reports`}
              >
                <StyledLink>
                  {' '}
                  <span>Module Summary</span> Reports{' '}
                </StyledLink>
              </Link>
            </Box>
          </Box>
        </SidebarMainBox>
      </Sidebar>
    </MainGrid>
  )
}

export default ComprehensiveLayout
