import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem';
import TableBody from '@mui/material/TableBody';

export default function SortableZone(props) {
  const { items, setItems } = props

  return (
    <>
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
        <TableBody>
          {items.map(i =>
            <SortableItem
              {...i.attributes}
              key={i.id}
              id={i.id}
              onRemove={handleRemove}
            />)}
        </TableBody>
        </SortableContext>
    </>
  )

  function handleRemove(id) {
    setItems((items) => items.filter((i) => i.id !== id))
  }

}

