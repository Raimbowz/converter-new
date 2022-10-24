import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { observer } from 'mobx-react';
import styles from './Select.module.css';

const SelectBox = ({label,currencies ,selectStore,currenciesStore}) => {

  function changeValue({target}){
    selectStore.handleValueChange(target.value);

    currenciesStore.getActiveRate();
    if(selectStore.type){
      localStorage.setItem('currencyFrom',selectStore.value);
      currenciesStore.getRates(target.value).then(()=>{
        currenciesStore.inputStoreTo.value = currenciesStore.calc(currenciesStore.inputStoreFrom.value, selectStore.type,2);
          
          if(selectStore.value!=null){
            currenciesStore.getDopText();
          }
      });
    }else{
      localStorage.setItem('currencyTo',selectStore.value);
      
      if(currenciesStore.inputStoreTo.value>0){
        currenciesStore.inputStoreFrom.value = currenciesStore.calc(currenciesStore.inputStoreTo.value, selectStore.type,2);
      }else{
        currenciesStore.inputStoreTo.value = currenciesStore.calc(currenciesStore.inputStoreFrom.value, !selectStore.type,2); 
      }

      if(selectStore.value!=null){
        currenciesStore.getDopText();  
      }                                                             
    }
  } 

  const style = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        top: "-25px"
      }
    }
  }    
  
  return (
    <FormControl fullWidth >
      <InputLabel className={styles['inputLabel']} sx={style}>{label}</InputLabel>
      <Select className={styles['inputAutocomplete']}
          value={selectStore.value}
          label={selectStore.label}
          onChange = {changeValue} >
            { Object.entries(currencies).map((keyName,i) => {
                return  <MenuItem value={keyName[0]} key={keyName[1]}>
                          <b className={styles.currencyName}>{keyName[0]}</b> {keyName[1]}
                        </MenuItem>
            })}
      </Select>
    </FormControl>
  )
}

export default observer(SelectBox);