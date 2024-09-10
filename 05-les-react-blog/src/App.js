import React, {useEffect, useState} from "react";
import {Route, Router, Routes, useNavigate} from "react-router-dom";
import {format} from "date-fns";
import Home from "./Home";
import Layout from "./Layout";
import About from "./About"
import Missing from "./Missing";
import PostPage from "./PostPage";
import NewPost from "./NewPost";

function App() {
  const [posts, setPosts] = useState([{
    id:1,
    title: "my first post",
    datetime: "July 07, 2022 12:17:36 AM",
    body: "hello"
  },
  {
    id:2,
    title: "my second post",
    datetime: "July 07, 2022 12:17:39 AM",
    body: "Helloyeen"
  },
  {
    id:3,
    title: "my second post",
    datetime: "July 07, 2022 12:17:39 AM",
    body: "Helloyeenfdfgfgsddddddddddddddddddddddddd"
  }]
);

const [search, setSearch] = useState("");
const [searchResult, setSearchResult] = useState([])
const [postTitle, setPostTitle] = useState("")
const [postBody, setPostBody] = useState("")

const navigate = useNavigate()

const handleDelete = (id) => {
  const postList = posts.filter(post => post.id !== id)
  setPosts(postList)
  navigate("/")
}

const handleSubmit = e => {
  e.preventDefault()
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const datetime = format(new Date(), 'MMM dd, yyy pp')
  const myNewPost = {id, title: postTitle, datetime, body: postBody };
  const postList = [...posts, myNewPost];
  setPosts(postList)
  setPostBody("")
  setPostTitle("")
  navigate("/")
}

useEffect(() => {
  const filterPost = posts.filter(post => 
    ((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase())
  )

  setSearchResult(filterPost.reverse());
}, [posts, search])


  return (
    <Routes>
      <Route path="/" element={<Layout 
        posts={posts}
        search={search}
        setSearch={setSearch}
      />} >
        <Route index element={<Home posts={searchResult}/>}/>
        <Route path="post">
          <Route index element={<NewPost 
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />}/>
          <Route path=":id" element={<PostPage 
            posts={posts}
            handleDelete={handleDelete}
            />}/>
        </Route>

        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  );
}

export default App;
