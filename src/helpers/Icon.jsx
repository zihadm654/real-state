import React from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link } from "react-router-dom"
const Icon = ({ text, linkName }) => {
  return (
    <div className="link">
      <Link to={linkName}>
        {text}
        <HiOutlineArrowRight className="icon" />
      </Link>
    </div>
  )
}

export default Icon