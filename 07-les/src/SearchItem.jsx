import React from 'react'

const SearchItem = ({searchItem,setSearchItem}) => {
  return (
    <form className='searchForm' onSubmit={e => e.preventDefault}>
      <input
        type='text'
        role='searchbox'
        placeholder='Search Item'
        value={searchItem}
        onChange={e => setSearchItem(e.target.value)}
      />
        
    </form>
  )
}

export default SearchItem