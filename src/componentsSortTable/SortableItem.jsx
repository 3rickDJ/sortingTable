import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableCell } from '@mui/material';
import TableRow from '@mui/material/TableRow';

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.sortId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { title, clave, description, code, sortId } = props
  const { item } = props

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <TableCell>{sortId}</TableCell>
      <TableCell component="th" scope="row">
        {title}
      </TableCell>
      <TableCell>{code}</TableCell>
      <TableCell>{clave}</TableCell>
      <TableCell>
        <div 
          style={{ maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: "nowrap" }}>
        {description}
          </div>
        </TableCell>
      <TableCell>
        <button onClick={() => props.onRemove(item)}>
          Remove
        </button>
        <button {...listeners} >
          <svg viewBox="0 0 20 20" width="12">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </button>
      </TableCell>
    </TableRow>
  );
}