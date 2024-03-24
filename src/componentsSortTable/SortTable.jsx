import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from "@mui/material"

import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove, verticalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import SortableItem from './SortableItem.jsx';

const columns = [
  { id: 'id', label: 'id', minwidth: 170 },
  { id: 'title', label: 'Nombre', minwidth: 100 },
  { id: 'code', label: 'Código', minwidth: 100 },
  { id: 'clave', label: 'Clave', minwidth: 100 },
  { id: 'description', label: 'Descripción', minwidth: 100 },
  { id: 'actions', label: 'acciones', minwidth: 100}
]

export default function SortTable(props) {
  const { tests } = props
  const { profiles } = props
  const { sortOrder, setSortOrder } = props

  const handleDelete = (test) => {
    let newTestGroup = [...sortOrder];
    console.log(test)
    newTestGroup = newTestGroup.filter((item) => item.sortId !== test.sortId);
    setSortOrder(newTestGroup);
  }
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      corrdinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.sortId !== over.sortId) {
      setItems((items) => {
        const oldIndex = items.findIndex( i => i.sortId === active.sortId)
        const newIndex = items.findIndex( i => i.sortId === over.sortId)
        const newArray = arrayMove(items, oldIndex, newIndex)
        return newArray
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '50px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <SortableContext
            items={sortOrder.map((test) => test.sortId)}
            strategy={verticalListSortingStrategy}
          >
            <TableBody>
              {sortOrder.map((test) => (
                <SortableItem
                  {...test.attributes}
                  item={test}
                  key={test.sortId}
                  sortId={test.sortId}
                  onRemove={handleDelete}
                />
              ))}
            </TableBody>
          </SortableContext>
        </Table>
      </TableContainer>
    </DndContext>
    
  );
}