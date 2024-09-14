import React, {useEffect, useState} from "react";

import AddItem from "./AddItem";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {

  const [items, setItems] = useState([])
  const [newItems, setNewItems] = useState("")
  const [searchItem, setSearchItem] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const API_URL = "http://localhost:3500/items"


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        const listItems = await response.json()
        if(!response.ok) throw Error("Did not receive items")
        setItems(listItems);
      } catch (error) {
        console.log(error);
        setFetchError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => fetchItems())()
    }, 1000);
  }, [])
  

  const handleCheck = async (id) => {
    const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems)

    const myItem = listItems.filter(item => item.id === id)
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "applicatiom/json"
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }

    const requireUrl = `${API_URL}/${id}`
    const result = await apiRequest(requireUrl, updateOptions)
    if(result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)

    const deleteOptions = {method: "DELETE"}

    const requireUrl = `${API_URL}/${id}`
    const result = await apiRequest(requireUrl, deleteOptions)
    if(result) setFetchError(result)
  }

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id: id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems)

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "applicatiom/json"
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions)
    if(result) setFetchError(result)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItems) return;
    addItem(newItems);
    console.log(newItems);
    setNewItems("")
  }

  return (
    <div className="App">
      <Header />
      <SearchItem
        searchItem={searchItem}
        setSearchItem={setSearchItem}
      />
      <AddItem 
        newItems={newItems}    
        setNewItems={setNewItems}  
        handleSubmit={handleSubmit}
      />
      <main>
        {fetchError && <h2 className="error">{`Error : ${fetchError}`}</h2>}
        {isLoading && <p style={{textAlign: "center"}}>Loading...</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter( item => (item.item).toLowerCase().includes(searchItem.toLowerCase()))} 
          setItems={setItems} 
          handleCheck={handleCheck} 
          handleDelete={handleDelete} 
        />}
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
