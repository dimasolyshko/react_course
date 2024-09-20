import React, {useEffect, useState} from "react";
import {Route, Router, Routes, useNavigate} from "react-router-dom";
import {format} from "date-fns";
import Home from "./Home";
import Layout from "./Layout";
import About from "./About"
import Missing from "./Missing";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import api from "./api/posts"
import EditPost from "./EditPost";

function App() {
const [posts, setPosts] = useState([]);

const [search, setSearch] = useState("");
const [searchResult, setSearchResult] = useState([])
const [postTitle, setPostTitle] = useState("")
const [postBody, setPostBody] = useState("")
const [editTitle, setEditTitle] = useState("")
const [editBody, setEditBody] = useState("")

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
      } else { 
        console.log(`Error ${error.message}`);
      }
    }
  }
  fetchPosts();
}, [])


const navigate = useNavigate()

const handleDelete = async id => {
  try {
    await api.delete(`/posts/${id}`);
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    navigate("/");
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault()
  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
  const datetime = format(new Date(), 'MMM dd, yyy pp')
  const myNewPost = {id, title: postTitle, datetime, body: postBody };
  try {
    const response = await api.post("/posts", myNewPost)
    const allPost = [...posts, response.data];
    setPosts(allPost)
    setPostBody("")
    setPostTitle("")
    navigate("/")
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
}

const handleEdit = async (id) => {
  const datetime = format(new Date(), 'MMM dd, yyy pp');
  const updatePost = {id, title: editTitle, datetime, body: editBody };
  try {
    const response = await api.put(`/posts/${id}`, updatePost)
    const allPost = [...posts, response.data];
    setPosts(posts.map( post => post.id === id ? {... response.data} : post))
    setPostBody("")
    setPostTitle("")
    navigate("/")
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
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
        <Route path="post/:id/edit" element={<EditPost 
          posts={posts} 
          editTitle={editTitle} 
          setEditTitle={setEditTitle}
          editBody={editBody}
          setEditBody={setEditBody}
          handleEdit={handleEdit}
        />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  );
}

export default App;
