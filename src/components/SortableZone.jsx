import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem';
import TableBody from '@mui/material/TableBody';

export default function SortableZone(props) {
  const { items, setItems, currentTab } = props

  return (
    <>
        <SortableContext
          items={items.list[currentTab].items}
          strategy={verticalListSortingStrategy}
        >
        <TableBody>
          {items.list[currentTab].items.map(i =>
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
    setItems((items) => {
      return ({
        ...items,
        list: items.list.map((group, index) => {
          if (index === currentTab) {
            return {
              ...group,
              items: group.items.filter(i => i.id !== id)
            }
          }
          return group
        })
    })})
  
  }

}

