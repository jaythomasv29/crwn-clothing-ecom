import React from 'react'
import { useLocation } from 'react-router-dom'

const FramerMotionContainer = ({ children }) => {
  const location = useLocation()
  console.log(location)
  return (
    children
  )
}

export default FramerMotionContainer