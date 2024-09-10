import React from 'react'

const Footer = (props) => {
  const year = new Date()
  return (
    <footer className='footer'>Footer
      <p className='total-items'>
        total {props.length} {props.length <= 1 ? "item" : "items"} 
      </p>
      <p className='year'>
        {year.getFullYear()}
      </p>
    </footer>
  )
}

export default Footer