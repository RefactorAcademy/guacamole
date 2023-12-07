import * as React from 'react'
import ReactPlayer from 'react-player'
import { Chapter } from '../../interfaces'
import isomorphicUnfetch from 'isomorphic-unfetch'
import { getVimeoUrl } from '../../utilities'
import { VideoWrapper, StatusWrapper, Wrapper } from './style'
import Iframe from 'react-iframe'
const SCREENCAST_URLS = [
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/232fef5e-68e5-4781-bb20-252ed6410910/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/4958ee2a-0944-4367-a5a9-dd9741f50fe8/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/316ad5e2-a122-4186-bdc7-5da75024f7f3/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/8a33e052-9218-4aeb-9dee-e37b31372960/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/d5be2dfb-8acb-49e1-9093-091e25d1e69b/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/7df09e4a-944d-47c7-a9f3-8b3a3a0e858f/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/fd9059f0-a3a7-4096-aed4-403d2b83761f/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/9f2de28b-b731-4d09-b181-d3e08dd4aa03/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/923d3aad-8ac6-45d9-b182-07cb4e84875e/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/e9dec0b6-ad1d-4cfd-8723-8e8d8c8b0ef7/embed',
  'https://www.screencast.com/users/JasdeepHundal/folders/Camtasia/media/0bd2a385-0d3c-4cc1-9e1e-91570b824949/embed',
]

type VideoProps = {
  chapter: Chapter
  id: string
  moduleId: string
}

type VideoState = {
  start: number
  duration: number
  playing: boolean
  chapterStarted: boolean
  chapterCompleted: boolean
  playedSeconds: number
  played: number
}

class ModuleVideoPlayer extends React.Component<VideoProps, VideoState> {
  state: VideoState = {
    duration: 0,
    start: 0,
    playedSeconds: 0,
    played: 0,
    chapterStarted: false,
    chapterCompleted: false,
    playing: false,
  }

  player: any = null

  constructor(props) {
    super(props)
    this.state = {
      start:
        (this.props.chapter &&
          !this.props.chapter.chapter_completed &&
          this.props.chapter.video_progress) ||
        0,
      duration: (this.props.chapter && this.props.chapter.video_progress) || 0,
      chapterStarted: false,
      chapterCompleted: this.props.chapter.chapter_completed,
      playing: false,
      playedSeconds: 0,
      played: 0,
    }
  }

  onProgress = state => {
    this.setState(state)

    // make sure new time is bigger than current stored time
    let storedVideoProgress = this.props.chapter.video_progress
      ? this.props.chapter.video_progress
      : 0
    const playedSeconds = state.playedSeconds

    if (
      !this.props.chapter.chapter_completed &&
      storedVideoProgress < playedSeconds
    ) {
      const data = {
        current_time: playedSeconds.toFixed(5),
        total_duration: this.state.duration.toFixed(5),
      }

      this.saveVideoProgress(data)
    }
  }

  saveVideoProgress = data => {
    const CHAPTER_ID =
      this.props.chapter &&
      this.props.chapter.chapterId &&
      this.props.chapter.chapterId.split('::')
    // console.log('chapter is this')
    // console.log(CHAPTER_ID)
    isomorphicUnfetch(
      `https://app.trakinvest.com/v1/courses/${this.props.id}/${
        this.props.moduleId
      }/${CHAPTER_ID[5]}/video`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('tkz'),
        },
        body: JSON.stringify(data),
      }
    ).then(r => {
      return r.json()
    })
  }
  getScreenCastUrl = () => {
    console.log('inside')

    // console.log('chapter is this', this.props.chapter)
    const CHAPTER_ID =
      this.props.chapter &&
      this.props.chapter.chapterId &&
      this.props.chapter.chapterId.split('::')

    console.log({ CHAPTER_ID })

    console.log(SCREENCAST_URLS[parseInt(CHAPTER_ID[3]) - 1])
    return SCREENCAST_URLS[parseInt(CHAPTER_ID[3]) - 1]
  }
  onDuration = duration => {
    this.setState({ duration })
  }

  onPause = () => {
    this.setState({ playing: false })
  }

  onEnded = () => {
    this.setState({
      playing: false,
      chapterCompleted: true,
    })
  }

  onPlay = () => {
    this.setState({
      playing: true,
      chapterStarted: true,
    })
  }

  render() {
    const { id, chapter } = this.props

    let progressText = this.state.chapterStarted ? 'STARTED' : 'NOT YET STARTED'

    console.log({ progressText })

    if (!chapter.chapter_completed && chapter.video_progress) {
      progressText = 'STARTED'
    } else if (this.state.chapterCompleted) {
      progressText = 'COMPLETED'
    }

    // return (<div>test</div>)

    // @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    // color: ${({ theme }) => theme.colors.brandSecondary};
    return (
      <Wrapper>
        <StatusWrapper>{progressText}</StatusWrapper>
        <VideoWrapper>
          {id == 4 ? (
            <Iframe url={this.getScreenCastUrl()} width="100%" height="450px" />
          ) : (
            <ReactPlayer
              width="100%"
              style={{ background: 'transparent' }}
              url={getVimeoUrl(chapter.video_url)}
              ref={player => {
                this.player = player
              }}
              config={{
                vimeo: {
                  playerOptions: { controls: true },
                },
              }}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
              onPlay={this.onPlay}
              onPause={this.onPause}
              onEnded={this.onEnded}
              progressInterval={3000}
              onReady={() => this.player.seekTo(this.state.start)}
            />
          )}
        </VideoWrapper>
      </Wrapper>
    )
  }
}

export default ModuleVideoPlayer
