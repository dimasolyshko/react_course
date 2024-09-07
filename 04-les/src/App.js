import React, {useState} from "react";

import AddItem from "./AddItem";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import SearchItem from "./SearchItem";

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem("todolist")) || [])
  const [newItems, setNewItems] = useState("")
  const [searchItem, setSearchItem] = useState("")

  const handleCheck = (id) => {
    const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems)
    localStorage.setItem("todolist", JSON.stringify(listItems))
  }

  const handleDelete = (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)
    localStorage.setItem("todolist", JSON.stringify(listItems))
  }

  const setAndSaveItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem("todolist", JSON.stringify(newItems))
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems)
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
      <Content 
        items={items.filter( item => (item.item).toLowerCase().includes(searchItem.toLowerCase()))} 
        setItems={setItems} 
        handleCheck={handleCheck} 
        handleDelete={handleDelete} 
      />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
