import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
import Nav from "./Nav";
import useWindowSIze from './hooks/useWindowSIze';

const Layout = ({posts, search, setSearch}) => {
  const {width} = useWindowSIze()
  return (
    <div className='App'>
        <Header title="React Custom Hook" width={width}/>
        <Nav 
            search={search}
            setSearch={setSearch}
        />
        <Outlet/>
        <Footer length={posts.length} />
    </div>
  )
}

export default Layout