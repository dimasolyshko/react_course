import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
import Nav from "./Nav";

const Layout = ({posts, search, setSearch}) => {
  return (
    <div className='App'>
        <Header title="React js Block"/>
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