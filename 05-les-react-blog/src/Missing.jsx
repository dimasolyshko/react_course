import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className="missing">
      <h2>Post not Found</h2>
      <p>Well... That's dissapoint...</p>
      <Link to="/">Visit on our page</Link>
    </main>
  )
}

export default Missing