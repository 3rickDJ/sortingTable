import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Title from './components/Title'
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './components/Draggable';
import {Droppable} from './components/Droppable';

function App() {
  const [count, setCount] = useState(0)
  const [isDropped, setIsDropped] = useState(false)
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  )

  return (
    <>
      {/* <div>
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
      </div> */}
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <Droppable>
          {isDropped ? draggableMarkup : 'Drop here'}
        </Droppable>
      </DndContext>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable'){
      setIsDropped(true)
    }
  }
}

export default App
