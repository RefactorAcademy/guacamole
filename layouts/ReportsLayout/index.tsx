import Link from 'next/link'
import * as React from 'react'
import {
  Heading,
  Box,
  Meter,
  Stack,
  Text,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from 'grommet'
import { DocumentMissing } from 'grommet-icons'
import { CourseReports } from '../../interfaces'
import BorderedHeading from '../../components/BorderedHeading'
import {
  ProgressHolder,
  StyledTable,
  StyledA,
  MainGrid,
  MainBody,
  Sidebar,
  StyledLink,
} from './style'

const ReportsLayout: React.FC<CourseReports> = ({ reports, course, id }) =>
  course.title && reports && reports.progressData ? (
    <MainGrid>
      <MainBody>
        <Box animation="zoomIn" pad="medium">
          <Box direction="row">
            <Box alignSelf="start" pad="small">
              <Heading
                level="2"
                margin={{
                  top: 'none',
                  bottom: 'small',
                }}
                dangerouslySetInnerHTML={{ __html: course.title }}
              />
            </Box>
          </Box>
          <Box direction="row" pad="small">
            <ProgressHolder>
              <Stack anchor="center">
                <Meter
                  type="circle"
                  values={[
                    {
                      value: reports.percentage_course_completed,
                      label: 'meter',
                      color: '#4ed4f8',
                    },
                  ]}
                  size="xsmall"
                  thickness="small"
                />
                <Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
                  <Text size="xlarge" weight="bold">
                    {reports.percentage_course_completed}
                  </Text>
                  <Text size="small">%</Text>
                </Box>
              </Stack>
            </ProgressHolder>
            <div
              dangerouslySetInnerHTML={{ __html: course.subtitle }}
              style={{ marginBottom: '10px' }}
            />
          </Box>
          <Box direction="row">
            <Box pad="small" basis="full">
              <BorderedHeading>Course Performance Summary</BorderedHeading>
              <StyledTable caption="Report Summary" alignSelf="stretch">
                <TableHeader>
                  <TableRow>
                    <TableCell scope="col" border="bottom" />
                    <TableCell scope="col" border="bottom" alignSelf="center">
                      Percentage
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Text alignSelf="center">Final Score</Text>
                    </TableCell>
                    <TableCell>
                      <Text alignSelf="center">{reports.finalScore}%</Text>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Text alignSelf="center">Module Assessments</Text>
                    </TableCell>
                    <TableCell>
                      <Text alignSelf="center">
                        {reports.moduleAssessmentsAverage}%
                      </Text>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Text alignSelf="center">Comprehensive Assessment</Text>
                    </TableCell>
                    <TableCell>
                      <Text alignSelf="center">
                        {(reports.assessment &&
                          `${reports.comprehensiveScore}%`) ||
                          null}
                        {(!reports.assessment &&
                          !reports.comprehensive_QP &&
                          `Complete Module Assessments First`) ||
                          null}
                        {(!reports.assessment && reports.comprehensive_QP && (
                          <Link
                            as={`/courses/comprehensive`}
                            href={{
                              pathname: '/comprehensive',
                              query: {
                                id,
                              },
                            }}
                          >
                            <StyledA>Take Exam</StyledA>
                          </Link>
                        )) ||
                          null}
                      </Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </StyledTable>
            </Box>
          </Box>
          <Box direction="row">
            <Box pad="small" basis="full">
              <BorderedHeading>Course Progress Summary</BorderedHeading>
              <StyledTable caption="Report Summary" alignSelf="stretch">
                <TableHeader>
                  <TableRow>
                    <TableCell scope="col" border="bottom">
                      Module
                    </TableCell>
                    <TableCell scope="col" border="bottom">
                      Completion
                    </TableCell>
                    <TableCell scope="col" border="bottom" alignSelf="center">
                      Percentage
                    </TableCell>
                    <TableCell scope="col" border="bottom" alignSelf="center">
                      Assessment
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.keys(reports.progressData).map(moduleId => {
                    const progress = reports.progressData || {}
                    const progressModule = progress[moduleId] || {}
                    let assessmentValue = <DocumentMissing />
                    if (
                      progressModule.has_assessment &&
                      progressModule.assessment_attempted
                    ) {
                      assessmentValue = (
                        <span>{progressModule.percentage}%</span>
                      )
                    }

                    if (
                      progressModule.has_assessment &&
                      !progressModule.assessment_attempted
                    ) {
                      assessmentValue = (
                        <Link
                          as={`/courses/${moduleId}`}
                          href={{
                            pathname: '/module',
                            query: {
                              id,
                              moduleId,
                            },
                          }}
                        >
                          <StyledA>Take Exam</StyledA>
                        </Link>
                      )
                    }

                    return (
                      <TableRow key={moduleId}>
                        <TableCell>
                          <Text>{moduleId}</Text>
                        </TableCell>
                        <TableCell>
                          <Meter
                            size="full"
                            type="bar"
                            values={[
                              {
                                value:
                                  progressModule.percentage_module_completed,
                                color: '#4ed4f8',
                              },
                            ]}
                          />
                        </TableCell>
                        <TableCell>
                          <Text alignSelf="center">
                            {progressModule.percentage_module_completed}%
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text alignSelf="center">{assessmentValue}</Text>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </StyledTable>
            </Box>
          </Box>
        </Box>
      </MainBody>
      <Sidebar>
        <Box>
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
            const moduleId = chapterModule.id.split('module::').pop()

            return (
              <Box key={chapterModule.id}>
                <Box direction="row">
                  <Link
                    href={{
                      pathname: '/module',
                      query: {
                        moduleId: moduleId,
                        id: 4,
                      },
                    }}
                    as={`/courses/${moduleId}`}
                  >
                    <StyledLink>
                      {' '}
                      <span>Module {moduleId}</span>
                      {chapterModule.title}
                    </StyledLink>
                  </Link>
                </Box>
              </Box>
            )
          })}
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
                <StyledLink isActive={true}>
                  {' '}
                  <span>Module Summary</span> Reports{' '}
                </StyledLink>
              </Link>
            </Box>
          </Box>
        </Box>
      </Sidebar>
    </MainGrid>
  ) : (
    <Box pad="small">
      <Heading level="3"> No access </Heading>
    </Box>
  )

export default ReportsLayout
