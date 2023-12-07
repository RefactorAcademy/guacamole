import { DocumentTransfer } from 'grommet-icons'
import * as React from 'react'
import { Heading, Box } from 'grommet'
import { CourseModule } from '../../interfaces'
import decodeHtml from 'decode-html'
import Link from 'next/link'
import ModuleAssessment from '../../components/ModuleAssessment'
import ModuleVideoPlayer from '../../components/ModuleVideoPlayer'
import ModuleSummary from '../ModuleSummary'
import BorderedHeading from '../../components/BorderedHeading'
import Router from 'next/router'
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

const ModuleLayout: React.FunctionComponent<CourseModule> = ({
  course,
  module,
  moduleId,
  id,
}) => {
  // if (!module || !module.title) {
  //   return (
  //     <Box pad="small">
  //       <Heading level="3"> No access </Heading>
  //     </Box>
  //   )
  // }

  // Do not show reports yet
  let nextModule = parseInt(moduleId, 10) + 1
  let nextPath = `/module`
  let nextLink = `/courses/${nextModule}`
  // if (parseInt('1', 10) === 10) {
  //   nextModule = 1
  //   nextPath = `/comprehensive`
  //   nextLink = `/courses/assessment`
  // }
  const chapters: React.ReactNode[] = []

  return (
    <MainGrid>
      {/* <ModuleVideoPlayer chapter={{ "title": "First Chapter", "id": "ch::id::bl::1", desc: "Test Description","chapter_completed": false,"video_progress": 0,"video_url":"https://google.com", chapterId: "ch::id::bl::1"}} id={"4"} moduleId={"1"}/> */}
      <MainBody animation="zoomIn" pad="medium">
        <Box direction="row">
          <Box align="stretch" pad="small">
            <Heading
              level="2"
              margin={{
                top: 'none',
                bottom: 'medium',
              }}
              dangerouslySetInnerHTML={{ __html: course.title }}
            />
            <ModuleSummary title={`Module 1`} desc={'module dec'} count={'1'} />
          </Box>
        </Box>
        {/* <ModuleVideoPlayer
                        chapter={chapter}
                        id={id}
                        moduleId={moduleId}
                      /> */}

        <ModuleVideoPlayer
          chapter={{
            title: 'First Chapter',
            id: 'ch::id::bl::1',
            desc: 'Test Description',
            chapter_completed: false,
            video_progress: 0,
            video_url: 'https://google.com',
            chapterId: 'ch::id::bl::1',
          }}
          id={'4'}
          moduleId={'1'}
        />
        {/* {module.chapters.map(chapter => {
          chapters.push(
            <div key={chapter.id}>
              <Anchor smooth to={chapter.id}>
                {chapter.title}
              </Anchor>
            </div>
          )
          return (
            <AnchorSection key={chapter.id} name={chapter.id}>
              <Box direction="row">
                <Box pad="small" basis="full">
                  <BorderedHeading>{chapter.title}</BorderedHeading>
                  {chapter.video_url && (
                    <Box align="center" basis="full" pad="medium">
                      <ModuleVideoPlayer
                        chapter={chapter}
                        id={id}
                        moduleId={moduleId}
                      />
                    </Box>
                  )}
                  {chapter.desc && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(chapter.desc),
                      }}
                    />
                  )}
                </Box>
              </Box>
            </AnchorSection>
          )
        })} */}
        {/* {module.assessment && module.assessment.length ? (
          <ModuleAssessment
            id={id}
            moduleId={moduleId}
            assessment={module.assessment}
            submittedAnswers={module.progress.assessment}
            assessmentAttempted={module.progress.assessment_attempted}
            score={module.progress.percentage}
            previousAssessmentCompleted={
              module.progress.previous_assessment_completed
            }
          />
        ) : null} */}
        {/* {nextModule && (
          <Box direction="row" justify="end" pad="small">
            <Link
              href={nextLink}
              // {{
              //   pathname: nextPath,
              //   query: {
              //     moduleId: nextModule,
              //     id: 4,
              //   },
              // }}
              // as={nextLink}
            >
              <StyledButton
                icon={<DocumentTransfer size="small" color="brand" />}
                label="Next Module"
                primary
              />
            </Link>
          </Box>
        )} */}
      </MainBody>

      <Sidebar>
        <SidebarMainBox>
          {/* <Box>
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
          </Box> */}
          {/* {course.modules.map(chapterModule => {
            const chapterModuleId = chapterModule.id.split('module::').pop()
            let isActive = chapterModuleId === moduleId ? true : false

            return (
              <Box
                key={chapterModule.id}
                // onClick = {()=>{Router.push(`/courses/${chapterModuleId}`)}}
              >
                <Box direction="row">
                  <Link
                    href={'/courses/' + chapterModuleId}
                    // {{
                    //   pathname: '/module',
                    //   query: {
                    //     moduleId: chapterModuleId,
                    //     id: 4,
                    //   },
                    // }}
                    // as={`/courses/${chapterModuleId}`}
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
          })} */}

          <Box
            key={'id'}
            // onClick = {()=>{Router.push(`/courses/${chapterModuleId}`)}}
          >
            <Box direction="row">
              <Link
                href={'/courses/' + 1}
                // {{
                //   pathname: '/module',
                //   query: {
                //     moduleId: chapterModuleId,
                //     id: 4,
                //   },
                // }}
                // as={`/courses/${chapterModuleId}`}
              >
                <StyledLink isActive={true}>
                  {' '}
                  <span>Module {1}</span>
                  {'chapterModule.title'}
                </StyledLink>
              </Link>
            </Box>
            {/* {chapterModule.id === module.id && ( */}
            {/* <SidebarChapter direction="column">{chapters}</SidebarChapter> */}
            {/* )} */}
          </Box>
          <Box>
            <Box direction="row">
              <Link
                href={{
                  pathname: '/comprehensive',
                  query: {
                    id,
                  },
                }}
                as={`/courses/assessment`}
              >
                <StyledLink>
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

export default ModuleLayout
