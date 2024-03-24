import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function AddTestButton(props) {
  const { optionTests } = props
  const { optionProfiles } = props
  const { sortOrder, setSortOrder } = props

  const handleAdd = (test) => {
    if (!test) return;
    let newTestGroup = [...sortOrder];
    if (newTestGroup.some((item) => item.sortId === test.sortId)) return;
    newTestGroup.push(test);
    setSortOrder(newTestGroup);
  }



  const options = [...optionTests, ...optionProfiles]
  return (
    <Autocomplete
      id="add-test"
      options={options}
      getOptionLabel={(option) => option.attributes.title}
      isOptionEqualToValue={(option, value) => option.sortId === value.sortId}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Añade una prueba o perfil" />}
      noOptionsText="Sin resultados"
      onChange={(event, newValue) => handleAdd(newValue)}
      renderOption={(props, option) => (
        <li {...props} key={option.sortId} >
          {option.attributes.title} - {option.attributes.code} - {option.attributes.clave}
        </li>
      )}
    />
  );
}