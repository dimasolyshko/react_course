import React, {useState} from 'react'

const Content = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "Hello world",
    },
    {
      id: 2,
      checked: false,
      item: "Hello Nikke",
    },
    {
      id: 3,
      checked: false,
      item: "Hello Tikke",
    }
  ])
  console.log(items);
  return (
    <main>
        Project
    </main>
  )
}

export default Content
