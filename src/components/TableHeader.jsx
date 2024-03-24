import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SortableZone from './SortableZone.jsx';
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
  const { items, setItems, currentTab } = props
  const columns = [
    { id: 'id', label: 'id', minwidth: 170 },
    { id: 'name', label: 'nombre', minwidth: 100 },
    { id: 'clave', label: 'clave', minwidth: 100 },
    { id: 'abbreviation', label: 'abreviatura', minwidth: 100 },
    { id: 'description', label: 'descripción', minwidth: 100 },
    { id: 'actions', label: 'acciones', minwidth: 100}
  ]
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      corrdinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.list[currentTab].items.findIndex( i => i.id === active.id)
        const newIndex = items.list[currentTab].items.findIndex( i => i.id === over.id)
        const newArray = arrayMove(items.list[currentTab].items, oldIndex, newIndex)
        return ({
          ...items,
          list: items.list.map((group, index) => {
            if (index === currentTab) {
              return {
                ...group,
                items: newArray
              }
            }
            return group
          })
        })
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
          <SortableZone items={items} setItems={setItems} currentTab={currentTab} />
        </Table>
      </TableContainer>
    </DndContext>
  )
}
