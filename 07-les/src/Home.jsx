import React from 'react'
import Feed from './Feed'

const Home = ({posts, fetchError, isLoading}) => {
  return (
    <main className='home'>
      {isLoading && <p className='statusMs'>Loading...</p>}
      {!isLoading && fetchError && <p className='statusMs' style={{color: "red"}}>
        {fetchError}</p>}
      {!isLoading && !fetchError && 
        (posts.length ? <Feed posts={posts}/> : "<p className='statusMs'>No post display...</p>")
      }        
    </main>
  )
}

export default Home