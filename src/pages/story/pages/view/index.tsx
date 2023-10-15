import React from 'react'
import { useParams } from 'react-router-dom'

const StoryView = () => {
  const { userId } = useParams()
  return <div>StoryView</div>
}

export default StoryView
