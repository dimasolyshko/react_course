import React, {useState} from 'react'
import { FaTrashAlt } from "react-icons/fa";

const Content = (props) => {
  return (
    <>
      {props.items.length ? (
        <ul>
        {props.items.map(item => (
          <li className='item' key={item.id}>
            <input 
              type="checkbox" 
              checked={item.checked}
              onChange={() => props.handleCheck(item.id)}
            />
            <label
            style={(item.checked) ? {textDecoration: "line-through"} : null}
             onDoubleClick={() => props.handleCheck(item.id)}
            >
              {item.item}
            </label>
            <FaTrashAlt
              role='button'
              tabIndex='0'
              onClick={() => props.handleDelete(item.id)}
            />
          </li>
        ))}
      </ul>
      ) : (
        <p style={{
          marginTop: "40px",
          color: "red",
          fontWeight: "bold",
          textAlign: "center"
        }}>
          Your list is empty!
        </p>
      )

      }
    </>
  )
}

export default Content
