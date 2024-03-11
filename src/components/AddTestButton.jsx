//autocomplete mui add test to testGroup json

import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function AddTestButton(props) {
  const { testGroup, setTestGroup, currentTab, fetchedData } = props;
  console.log(fetchedData)
  const addTest = (test) => {
    const newTestGroup = { ...testGroup };
    if (!test) return;
    if (newTestGroup.list[currentTab].items.some((item) => item.id === test.id)) return;
    newTestGroup.list[currentTab].items.push(test);
    setTestGroup(newTestGroup);
  };
  return (
    <Autocomplete
      id="add-test"
      options={fetchedData}
      getOptionLabel={(option) => option.attributes.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Añade una prueba" />}
      noOptionsText="Sin resultados"
      onChange={(event, newValue) => addTest(newValue)}
      renderOption={(props, option) => (
        <li {...props} >
          {option.attributes.title} - {option.attributes.clave} - {option.attributes.abbreviation}
        </li>
      )}
    />
  );
}