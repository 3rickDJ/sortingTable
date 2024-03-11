import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SortableZone from './SortableZone';
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
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';

// read data from file json

export default function TableHeader(props) {
  const { items, setItems } = props
  const columns = [
    { id: 'id', label: 'id', minWidth: 170 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    { id: 'clave', label: 'Clave', minWidth: 100 },
    { id: 'abbreviation', label: 'Abreviatura', minWidth: 100 },
    { id: 'description', label: 'Descripción', minWidth: 100 },
    { id: 'actions', label: 'Acciones', minWidth: 100}
  ]
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      corrdinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event) {
    const { active, over } = event
    console.log(event)
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges, restrictToVerticalAxis]}
    >
      <TableContainer
        component={Paper}
        sx={{
          height: '100%',
          width: '100%',
        }}
      >
        <Table aria-label="simple table"
          sx={{
            minWidth: 650,
          }}
        >
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
          <SortableZone items={items} setItems={setItems} />
        </Table>
      </TableContainer>
    </DndContext>
  )
}
