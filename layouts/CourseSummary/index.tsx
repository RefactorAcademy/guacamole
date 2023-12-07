import * as React from 'react'
import decodeHtml from 'decode-html'
import { Heading, Grid, Box } from 'grommet'
import { Book } from 'grommet-icons'
import { Course } from '../../interfaces'
import { StyledBox, FixedBox, StyledButton } from './style'
import Link from 'next/link'
import ModuleSummary from '../ModuleSummary'
import BorderedHeading from '../../components/BorderedHeading'

const CourseSummary: React.FunctionComponent<Course> = ({
  title,
  subtitle,
  summary,
  modules,
  courseId,
  lastModuleVisited,
  resumeModule,
}) =>
  title ? (
    <Grid>
      <Box animation="zoomIn" pad="medium">
        <Box direction="row">
          <Box alignSelf="start">
            <Heading
              level="2"
              margin={{
                top: 'none',
                bottom: 'small',
              }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </Box>
          <FixedBox>
            <Link
              href={{
                pathname: '/module',
                query: {
                  moduleId: lastModuleVisited,
                  id: courseId,
                },
              }}
              as={`/courses/${lastModuleVisited}`}
            >
              <StyledButton
                // icon={<Book size="small" color="brand" />}
                label={
                  resumeModule === '1.1' ? 'Start Course' : 'Resume Course'
                }
                primary
              />
            </Link>
          </FixedBox>
        </Box>
        <Box direction="row">
          <div
            dangerouslySetInnerHTML={{ __html: subtitle }}
            style={{ marginBottom: '10px' }}
          />
        </Box>

        <Box direction="row">
          <StyledBox pad="small">
            <BorderedHeading>About This Course</BorderedHeading>
            <div dangerouslySetInnerHTML={{ __html: decodeHtml(summary) }} />
          </StyledBox>
        </Box>
        <Box direction="row">
          <Box pad="small">
            <BorderedHeading>Course Structure</BorderedHeading>
            {modules.map(module => {
              return (
                <ModuleSummary
                  title={module.title}
                  desc={module.desc}
                  key={module.title}
                  count={module.id.split('module::').pop()}
                />
              )
            })}
          </Box>
        </Box>
      </Box>
    </Grid>
  ) : (
    <Box pad="small">
      <Heading level="3"> No access </Heading>
    </Box>
  )

export default CourseSummary
