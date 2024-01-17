import React from 'react'
import VideoUploadForm from './VideoUploadForm'
import PdfUploadForm from './PdfUploadForm'
import AddChapter from './AddChapter'
import AddTopicForm from './AddTopicForm'

export default function AddCourseContent() {
  return (
    <div>
      <div><VideoUploadForm/></div>
      <div><PdfUploadForm/></div>
      <div><AddChapter/></div>
      <div><AddTopicForm/></div>
    </div>
  )
}
