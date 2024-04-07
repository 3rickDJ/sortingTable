import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { optionStructureParser } from "src/logic/order/utils";

const TRANSLATIONS = { test: 'Prueba', package: 'Paquete', profile: 'Perfil'}

const getOptionLabel = (option) => {
  const { title, code, type} = option
  return `${TRANSLATIONS[type]} - ${code} - ${title}`
}
const isOptionEqualToValue = (option, value) => option.uid === value.uid;
const getOptionKey = (option) => option.uid;
const renderOption = (props, option) => {
  const { type, code, title } = option;
  return (
    <li {...props} >
      {TRANSLATIONS[type]} - {code} - {title}
    </li>
  );
}
const getOptionDisabled = (option) => { 
  return option.feeConfigurations.length === 0
}


export default function AddStudiesButton(props) {

  const { selectedOptions, setSelectedOptions, options,
      fees, selectedFee
    } = props;

  const addTest = (study) => {
    if (!study) return;
    if (selectedOptions.some((item) => item.uid === study.uid)) return;
    const newStudy = optionStructureParser(study, selectedFee);
    setSelectedOptions( (prev) => [...prev, newStudy] );
  };
  return (
    <Autocomplete
      id="add-test"
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionKey={getOptionKey}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Añade un estudio" />}
      noOptionsText="Sin resultados"
      onChange={(event, newValue) => addTest(newValue)}
      renderOption={renderOption}
      getOptionDisabled={getOptionDisabled}
    />
  );
}
import PropTypes from 'prop-types';
AddStudiesButton.propTypes = {
  selectedOptions: PropTypes.array.isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  fees: PropTypes.array,
  selectedFee: PropTypes.number.isRequired,
};