import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Title from './components/Title'
import './App.css'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { SortableItem } from './SortableItem';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

function App() {
  const [count, setCount] = useState(0)

  const [items, setItems] = useState(['1', '2', '3', '4', '5']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      corrdinateGetter: sortableKeyboardCoordinates,
    })
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges, restrictToVerticalAxis]}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map(id =>
            <SortableItem
              key={id}
              id={id}
              onRemove={handleRemove}
            />)}
        </SortableContext>
      </DndContext>
    </>
  )

  function handleRemove(id) {
    setItems((items) => items.filter((i) => i !== id))
  }

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
}

export default App
