import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Title from './components/Title'
import './App.css'
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';

function App() {
  const [count, setCount] = useState(0)
  const [parent, setParent] = useState(null)
  const containers = ['A', 'B', 'C']
  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  )

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Title />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}
        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : 'DROP HERE MADAFAKA'}
          </Droppable>
        ))}
      </DndContext>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

  function handleDragEnd(event) {
    const {over} = event
    setParent(over ? over.id : null)
  }
}

export default App
