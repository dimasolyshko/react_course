import React, {useState} from "react";

import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("todolist")) || [])

  const handleCheck = (id) => {
    const listItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item)
    setItems(listItems)
    localStorage.setItem("todolist", JSON.stringify(listItems))
  }

  const handleDelete = (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)
  }

  return (
    <div className="App">
      <Header />
      <Content 
        items={items} 
        setItems={setItems} 
        handleCheck={handleCheck} 
        handleDelete={handleDelete} 
      />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
