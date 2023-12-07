import ModuleVideoPlayer from '../components/ModuleVideoPlayer'

const Test = () => {
  return (
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
  )
}

export default Test
